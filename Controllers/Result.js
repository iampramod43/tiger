/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const studentService = require('../Services/Student');
const subjectService = require('../Services/Subject');

const getResult = async (query) => {
  const criteria = {
    sem: query.sem,
    branch: query.branch,
    year: query.year,
    month: query.month,
    shift: query.shift,
  };
  //     const options = {
  //     skip: query.skip,
  //     limit: query.limit,
  //   };
  const populate = [{
    path: 'ia_totals.subject',
  }, {
    path: 'end_totals.subject',
  }];
    // get subjects
  const subjects = await subjectService.get();
  //   console.log('subjects>>>>', subjects);
  const students = await studentService.get(criteria, {}, {}, populate);
  //   console.log('students>>>>', students);
  const result = students.map((student) => {
    const { ia_totals, end_totals } = student;
    if (ia_totals.length || end_totals.length) {
      const allMarks = ia_totals.map(({ subject, marks }) => {
        const temp1 = {};
        temp1.subject = subject;
        temp1.cie = marks === 'AB' || marks === 'NE' ? marks : parseInt(marks, 10);
        // console.log('data>>>', temp1);
        // console.log('end_totals>>>>', end_totals);
        temp1.see = end_totals.find(({ subject: sub }) => sub._id.toString() === temp1.subject._id.toString());
        // console.log('temp1>>>>', temp1.see);
        if (temp1.see) temp1.see = temp1.see.marks === 'AB' || temp1.see.marks === 'NE' ? temp1.see.marks : parseInt(temp1.see.marks, 10);
        else temp1.see = 0;
        if ((temp1.cie === 'AB' || temp1.cie === 'NE') && (temp1.see !== 'AB' && temp1.see !== 'NE')) temp1.total = temp1.see;
        else if ((temp1.cie !== 'AB' && temp1.cie !== 'NE') && (temp1.see === 'AB' || temp1.see === 'NE')) temp1.total = temp1.cie;
            else if ((temp1.cie === 'AB' || temp1.cie === 'NE') && (temp1.see === 'AB' || temp1.see === 'NE')) temp1.total = 0;
        else temp1.total = temp1.cie + temp1.see;
        // temp1.total = temp1.cie + temp1.see;
        temp1.result = (temp1.cie >= temp1.subject.min_cie_marks && temp1.see >= temp1.subject.min_see_marks && temp1.cie !== 'AB' && temp1.see !== 'NE') ? 'P' : 'F';
        return temp1;
      });
        // console.log('allMarks>>>>', allMarks);
      const temp = {};
      temp.name = student.name;
      temp.reg_no = student.reg_no;
        temp.marks = allMarks;
        console.log('allMarks>>>>', allMarks);

        temp.total = allMarks.reduce((acc, curr) => acc + curr.total, 0);
        console.log('temp.total>>>>', temp.total);
      temp.remarks = 'PASS';
    //   console.log(temp);
      temp.marks.forEach((mark) => {
        if (mark.result === 'F') {
          temp.remarks = 'FAIL';
        }
      });
      if (student.branch !== 'CPE' && student.branch !== 'CPK' && student.branch !== 'AU') {
        temp.grace = (temp.remarks === 'PASS' && temp.total >= 275 && temp.total < 290) ? 280 - temp.total : 0;
        temp.grace = (temp.remarks === 'PASS' && temp.total >= 235 && temp.total < 240) ? 240 - temp.total : 0;
        temp.total += temp.grace;
      }
      if (student.branch === 'AU') {
        temp.grace = (temp.remarks === 'PASS' && temp.total >= 345 && temp.total < 350) ? 350 - temp.total : 0;
        temp.grace = (temp.remarks === 'PASS' && temp.total >= 295 && temp.total < 300) ? 300 - temp.total : 0;
        temp.total += temp.grace;
      }

      temp.finalResult = (temp.remarks === 'FAIL') ? 'FAIL' : 'PASS';
      if (student.branch !== 'AU') {
        if (temp.total >= 280) temp.finalResult = 'DISTINCTION';
        if (temp.total >= 260 && temp.total < 280) temp.finalResult = 'FIRST CLASS';
      }
      if (student.branch === 'AU') {
        if (temp.total >= 350) temp.finalResult = 'DISTINCTION';
        if (temp.total >= 300 && temp.total < 350) temp.finalResult = 'FIRST CLASS';
      }
      return temp;
    }
  });
  return result;
};

module.exports = {
  getResult,
};
