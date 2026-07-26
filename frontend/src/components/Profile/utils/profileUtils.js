export const calculateStreak = (submissions) => {
  if (!submissions || submissions.length === 0) {
    return {
      current: 0,
      longest: 0,
      lastActive: null,
      calendar: generateEmptyCalendar()
    };
  }

  const activeDates = new Set();
  submissions.forEach(sub => {
    if (sub.submittedAt || sub.createdAt) {
      const date = new Date(sub.submittedAt || sub.createdAt);
      const dateString = date.toISOString().split('T')[0];
      activeDates.add(dateString);
    }
  });

  const activeDatesArray = Array.from(activeDates).sort();
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayString = today.toISOString().split('T')[0];
  const yesterdayString = yesterday.toISOString().split('T')[0];

  if (activeDates.has(todayString)) {
    currentStreak = 1;
    let checkDate = new Date(yesterday);
    while (true) {
      const checkDateString = checkDate.toISOString().split('T')[0];
      if (activeDates.has(checkDateString)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  } else if (activeDates.has(yesterdayString)) {
    currentStreak = 1;
    let checkDate = new Date(yesterday);
    checkDate.setDate(checkDate.getDate() - 1);
    while (true) {
      const checkDateString = checkDate.toISOString().split('T')[0];
      if (activeDates.has(checkDateString)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  if (activeDatesArray.length > 0) {
    tempStreak = 1;
    longestStreak = 1;
    
    for (let i = 1; i < activeDatesArray.length; i++) {
      const prevDate = new Date(activeDatesArray[i - 1]);
      const currDate = new Date(activeDatesArray[i]);
      const diffTime = currDate - prevDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
  }

  const calendar = generateStreakCalendar(activeDates);

  return {
    current: currentStreak,
    longest: longestStreak,
    lastActive: activeDatesArray[activeDatesArray.length - 1] || null,
    calendar
  };
};

export const generateEmptyCalendar = () => {
  const calendar = [];
  const today = new Date();
  
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    calendar.push({
      date: date.toISOString().split('T')[0],
      active: false,
      isToday: i === 0
    });
  }
  
  return calendar;
};

export const generateStreakCalendar = (activeDates) => {
  const calendar = [];
  const today = new Date();
  
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    const isActive = activeDates.has(dateString);
    const isToday = i === 0;
    
    calendar.push({
      date: dateString,
      active: isActive,
      isToday: isToday
    });
  }
  
  return calendar;
};

export const getStreakColor = (count) => {
  if (count === 0) return 'bg-gray-600';
  if (count <= 7) return 'bg-green-500';
  if (count <= 30) return 'bg-orange-500';
  return 'bg-red-500';
};

export const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Recently';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch (err) {
    return 'Recently';
  }
};


