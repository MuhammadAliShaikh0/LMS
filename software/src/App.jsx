import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { auth } from './Config/Firebase'; 
import Navbar from './Components/Navbar'; 
import ClassForm from './Screens/Class/ClassForm';
import ClassList from './Screens/Class/ClassList';
import ExamResult from './Screens/Exam/ExamResult';
import ExamSchedule from './Screens/Exam/ExamSchedule';
import FeeStructure from './Screens/Fees/FeeStructure';
import FeeVoucher from './Screens/Fees/FeeVoucher';
import StudentList from './Screens/Student/StudentList';
import StudentRegistration from './Screens/Student/StudentRegistration';
import SubjectList from './Screens/Subjects/SubjectList';
import SubjectsAdd from './Screens/Subjects/SubjectsAdd';
import SyllabusForm from './Screens/Syllabus/SyllabusForm';
import SyllabusList from './Screens/Syllabus/SyllabusList';
import TeacherList from './Screens/Teacher/TeacherList';
import TeacherRegistration from './Screens/Teacher/TeacherRegistration';
import FeeSubmission from './Screens/Fees/FeeSubmission';
import Signup from './Screens/Signup/Signup';
import Login from './Screens/Login/Login';
import AuthRoute from './Protected/AuthRoute';
import ProtectedRoute from './Protected/ProtectedRoute';

const App = () => {


  return (
    
        <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
                    </Route>

        <Route  element={<ProtectedRoute />}>
     
        
          <Route path="/studentlist" element={<StudentList />}/>
          <Route path="/AdmissionForm" element={<ClassForm />}/>
          <Route path="/ClassForm" element={<ClassForm />} />
          <Route path="/ClassList" element={<ClassList />} />
          <Route path="/ExamResult" element={<ExamResult />} />
          <Route path="/ExamSchedule" element={ <ExamSchedule />}/>
          <Route path="/FeeStructure" element={<FeeStructure /> }/>
          <Route path="/FeeVoucher" element={ <FeeVoucher /> }/>
          <Route path="/StudentRegistration" element={<StudentRegistration />}/>
          <Route path="/SubjectList" element={<SubjectList />}/>
          <Route path="/SubjectsAdd" element={<SubjectsAdd />} />
          <Route path="/SyllabusForm" element={<SyllabusForm />} />
          <Route path="/SyllabusList" element={<SyllabusList />} />
          <Route path="/TeacherList" element={<TeacherList />} />
          <Route path="/TeacherRegistration" element={<TeacherRegistration />}/>
          <Route path="/FeeSubmission" element={<FeeSubmission />} />
        </Route>
        </Routes>
      
  );
};

export default App;


