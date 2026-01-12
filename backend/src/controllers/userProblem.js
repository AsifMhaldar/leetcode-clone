const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");
const Problem = require("../models/problem");
const User = require('../models/user');
const Submission = require("../models/submission");
const SolutionVideo = require("../models/solutionVideo");

const createProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);

        const resultToken = submitResult.map((value)=> value.token);        
        const testResult = await submitToken(resultToken);
        

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured*");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

const updateProblem = async (req,res)=>{
    
  const {id} = req.params;
  const {title,description,difficulty,tags,
    visibleTestCases,hiddenTestCases,startCode,
    referenceSolution, problemCreator
   } = req.body;

  // console.log('=== BACKEND UPDATE DEBUG ===');
  // console.log('Received tags:', tags);
  // console.log('Tags type:', typeof tags);
  // console.log('Full request body:', JSON.stringify(req.body, null, 2));
  // console.log('Problem ID:', id);

  try{

     if(!id){
      return res.status(400).send("Missing ID Field");
     }

    const DsaProblem =  await Problem.findById(id);
    if(!DsaProblem)
    {
      return res.status(404).send("ID is not present in server");
    }

    // Log current problem data
    // console.log('Current problem in DB:', {
    //   title: DsaProblem.title,
    //   tags: DsaProblem.tags,
    //   difficulty: DsaProblem.difficulty
    // });
      
    for(const {language,completeCode} of referenceSolution){
         
      const languageId = getLanguageById(language);
        
      // I am creating Batch submission
      const submissions = visibleTestCases.map((testcase)=>({
          source_code:completeCode,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output
      }));

      const submitResult = await submitBatch(submissions);
      const resultToken = submitResult.map((value)=> value.token);
      
     const testResult = await submitToken(resultToken);

     for(const test of testResult){
      if(test.status_id!=3){
       return res.status(400).send("Error Occurred");
      }
     }
    }

    // Create update object explicitly to ensure all fields are included
    const updateData = {
      title,
      description,
      difficulty,
      tags, // Make sure this is included
      visibleTestCases,
      hiddenTestCases,
      startCode,
      referenceSolution,
      problemCreator: req.result._id // Use the authenticated user from middleware
    };

    // console.log('Update data being sent to DB:', JSON.stringify(updateData, null, 2));

    const newProblem = await Problem.findByIdAndUpdate(
      id, 
      updateData, 
      {runValidators:true, new:true}
    );

    // console.log('Updated problem from DB:', {
    //   title: newProblem.title,
    //   tags: newProblem.tags,
    //   difficulty: newProblem.difficulty
    // });
   
    res.status(200).send(newProblem);
  }
  catch(err){
      console.error('Update error:', err);
      res.status(500).send("Error: "+err.message);
  }
}





const deleteProblem = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

   const deletedProblem = await Problem.findByIdAndDelete(id);

   if(!deletedProblem)
    return res.status(404).send("Problem is Missing");


   res.status(200).send("Successfully Deleted");
  }
  catch(err){
     
    res.status(500).send("Error: "+err);
  }
}


const getProblemById = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
        return res.status(400).send("ID is Missing");

    const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution');
   
    if(!getProblem)
        return res.status(404).send("Problem is Missing");


    const videos = await SolutionVideo.findOne({problemId:id});

    if(videos){

      const responseData = {
        ...getProblem.toObject(),
        secureUrl:videos.secureUrl,
        thumbnailUrl:videos.thumbnailUrl,
        duration:videos.duration,

      }
      
      return res.status(200).send(responseData);
    }
    res.status(200).send(getProblem);
    }
    catch(err){
    res.status(500).send("Error: "+err);
    }
}

const getAllProblem = async(req,res)=>{

    try{
     
    const getProblem = await Problem.find({});

    if(getProblem.length==0)
    return res.status(404).send("Problem is Missing");


    res.status(200).send(getProblem);
    }
    catch(err){
    res.status(500).send("Error: "+err);
    }
}

const getAllProblemAdmin = async(req,res)=>{
    try{
        // Return all fields for admin
        const getProblem = await Problem.find({});

        if(getProblem.length==0)
            return res.status(404).send("No problems found");

        res.status(200).send(getProblem);
    }
    catch(err){
        res.status(500).send("Error: "+err);
    }
}


const solvedAllProblembyUser = async(req, res)=>{

  try{

    // const count = req.result.problemSolved.length;
    const userId = req.result._id;
    const user = await User.findById(userId).populate({
      path:"problemSolved",
      select:"_id title difficulty tags"
    });


    res.status(200).send(user.problemSolved);

  }catch(err){
    res.status(500).send("Server Error..");
  }

}


const submittedProblem = async(req, res)=>{

  try{

      const userId = req.result._id;
      const problemId = req.params.pid;
      const ans = await Submission.find({userId, problemId});

      if(ans.length == 0){
        res.status(200).send("No submission is present.");
      }

      res.status(200).send(ans);

  }catch(err){  
    res.status(500).send("Internal Server Error..");
  }

}




module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem, getAllProblemAdmin};


