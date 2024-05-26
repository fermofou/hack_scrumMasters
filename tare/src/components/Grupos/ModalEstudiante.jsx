import React, { useEffect, useState } from 'react';
import './ModalEstudiante.css';

const ModalEstudiante = ({ isOpen, onClose, studentName }) => {
    const [studentInfo, setStudentInfo] = useState(null);
    const firstName = studentName.split(' ')[0]; // Get the first word in the student name
    console.log(firstName);

    useEffect(() => {
        if (isOpen && firstName) {
            const fetchStudentInfo = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/obtenerInfoEstudiante/${firstName}`);
                    const data = await response.json();
                    setStudentInfo(data);
                } catch (error) {
                    console.error('Error fetching student info:', error);
                }
            };

            fetchStudentInfo();
        }
    }, [isOpen, firstName]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">X</button>
                {studentInfo ? (
                    <>
                        <h2 className="modal-title">{studentInfo.nombreEstudiante}</h2>
                        <h4 className="modal-section-title">Asignaciones y Calificaciones</h4>
                        <ul className="modal-student-list">
                            {studentInfo.calificaciones.map((item, index) => (
                                <li key={index} className="modal-student-item">
                                    {item.nombreAsignacion}: {item.calificacion}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Cargando información del estudiante...</p>
                )}
            </div>
        </div>
    );
};

export default ModalEstudiante;
