import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditExamScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [examCode, setExamCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [exams, setExams] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/question", {
        params: { creator: userInfo.email },
      });
      setExams(response.data);
      toast.success("Loaded successfully");
    } catch (error) {
      console.error("Failed to load examList:", error);
      toast.error("Failed to load examList");
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creator = userInfo.email;
    try {
      await axios.post(
        "http://localhost:8080/api/question",
        { title, examCode, time, duration, instructions, creator },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Successfully created");
      setShow(false);
      fetchExams();
    } catch (error) {
      console.error("Failed to create exam:", error);
      toast.error("Failed to create exam");
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:8080/api/question/${id}`);
        toast.success("Exam deleted successfully");
        fetchExams();
      } catch (error) {
        console.error("Failed to delete exam:", error);
        toast.error("Failed to delete exam");
      }
    }
  };

  const editExam = (exam) => {
    localStorage.setItem("exam", JSON.stringify(exam));
    window.location.href = `/addExam/${exam._id}`;
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Exam</h2>
              <button onClick={handleClose} className="text-gray-600 hover:text-gray-900">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Exam Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Exam Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Exam Code</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Exam Code"
                  value={examCode}
                  onChange={(e) => setExamCode(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Exam Date</label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Exam Duration</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="120 (in minutes)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  rows={3}
                  placeholder="Description"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Edit Exam Papers</h3>
          <button onClick={handleShow} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <span className="fa fa-pencil mr-2"></span>Add Exams
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <div key={exam._id} className="bg-purple-600 text-white rounded-lg p-4 shadow-lg">
              <h4 className="text-xl font-bold">Subject: {exam.title}</h4>
              <p className="mt-2">Course Code: {exam.examCode}</p>
              <p className="mt-2">Exam Date: {new Date(exam.time).toLocaleString()}</p>
              <p className="mt-2">Duration: {exam.duration} minutes</p>
              <p className="mt-2 overflow-hidden max-w-[200px] overflow-ellipsis">Description: {exam.instructions}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => editExam(exam)}
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-4 py-2 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(exam._id)}
                  className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditExamScreen;
