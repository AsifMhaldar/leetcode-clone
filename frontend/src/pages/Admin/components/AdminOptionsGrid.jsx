import React from 'react';
import { NavLink } from 'react-router';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminOptions, MANAGEMENT_TOOLS_TITLE, MANAGE_LINK_TEXT } from '../constants';
import { staggerContainer, staggerItem } from '../../../utils/motion';
import './AdminOptionsGrid.scss';

const AdminOptionsGrid = () => {
  return (
    <div className="admin-options">
      <h2 className="admin-options__title">{MANAGEMENT_TOOLS_TITLE}</h2>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {adminOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <motion.div key={option.id} variants={staggerItem}>
              <NavLink
                to={option.route}
                className="block group"
              >
                <div className="admin-options__card">
                  <div className={`admin-options__icon bg-gradient-to-r ${option.color}`}>
                    <IconComponent size={28} className="text-white" />
                  </div>

                  <h3 className="admin-options__card-title">
                    {option.title}
                  </h3>

                  <p className="admin-options__card-desc">
                    {option.description}
                  </p>

                  <div className="admin-options__footer">
                    <span className="admin-options__link">
                      {MANAGE_LINK_TEXT}
                    </span>
                    <div className="admin-options__arrow">
                      <Code2 size={16} />
                    </div>
                  </div>
                </div>
              </NavLink>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AdminOptionsGrid;
