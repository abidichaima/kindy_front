import React, { useState, useEffect, useRef } from 'react';
import { Tab, Tabs } from 'react-tabs';
import Dashboard from './Dashboard';
import Chart from 'chart.js/auto';
import { useParams } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg';

function Dash(props) {
  const chartRef = useRef(null);
  const quizChartRef = useRef(null);

  const [chartInstance, setChartInstance] = useState(null);
  const [quizChartInstance, setQuizChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/result/showall`);
        const data = await response.json();

        // Compter le nombre de quiz par grade
        const gradeCounts = {};
        data.forEach(quizResult => {
          const gradeLevel = quizResult.userId.level;
          if (gradeCounts[gradeLevel]) {
            gradeCounts[gradeLevel]++;
          } else {
            gradeCounts[gradeLevel] = 1;
          }
        });

        // Créer des labels et des valeurs pour le graphique
        const labels = Object.keys(gradeCounts);
        const values = labels.map(gradeLevel => gradeCounts[gradeLevel]);

        // Créer le nouveau graphique
        const ctx = chartRef.current.getContext('2d');
        const newChartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Quiz par grade',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 99, 132, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // Mettre à jour l'état avec l'instance du nouveau graphique
        setChartInstance(newChartInstance);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Exécuté une seule fois au montage

  // Fonction pour générer une couleur RGB aléatoire
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256); // Rouge
    const g = Math.floor(Math.random() * 256); // Vert
    const b = Math.floor(Math.random() * 256); // Bleu
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Format RGBA avec opacité de 0.5
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/result/showall`);
            const data = await response.json();
            const quizScores = {};
  
            data.forEach(result => {
                const quizTitle = result.quizId.titre;
                const score = result.score;
  
                // Ajouter le score à la liste des scores pour ce quiz
                if (!quizScores[quizTitle]) {
                    quizScores[quizTitle] = [score];
                } else {
                    quizScores[quizTitle].push(score);
                }
            });
  
            // Créer le nouveau graphique pour les scores de quiz
            const ctxQuiz = quizChartRef.current.getContext('2d');
  
            // Préparer les données pour le graphique en nuage de points
            const datasets = Object.keys(quizScores).map((quizTitle) => ({
                label: quizTitle,
                data: quizScores[quizTitle].map((score, i) => ({ x: quizTitle, y: score })),
                backgroundColor: getRandomColor(), // Utilisation de couleurs aléatoires
                borderColor: 'rgba(255, 255, 255, 1)', // Bordure blanche pour les points
                borderWidth: 1,
                pointRadius: 5 // Taille des points
            }));
  
            const newQuizChartInstance = new Chart(ctxQuiz, {
                type: 'scatter', // Utilisation d'un graphique en nuage de points
                data: {
                    datasets: datasets
                },
                options: {
                    scales: {
                        x: {
                            type: 'category',
                            labels: Object.keys(quizScores) // Labels des quiz
                        },
                        y: {
                            beginAtZero: true,
                            suggestedMax: 100 // Limiter l'axe y à 100 pourcentage
                        }
                    }
                }
            });
  
            setQuizChartInstance(newQuizChartInstance);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <section className="tf-page-title ">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li>Home</li>
                <li>Profile</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={{ width: '100%' }}>
          <div className="row" style={{ width: '100%' }}>
            <div className="thumb-pagetitle" style={{ width: '100%' }}>
              <img src={img} alt="images" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="tf-dashboard tf-tab">
        <div className="tf-container">
          <Tabs className='dashboard-filter'>
            <div className="row">
              <div className="col-xl-3 col-lg-12 col-md-12">
                <Dashboard />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 overflow-table">
                <div className="dashboard-content inventory content-tab">
                  <canvas ref={quizChartRef} id="quizChart" width="200" height="200"></canvas>
                </div>
              </div>
              <div className="col-xl-1 col-lg-1 col-md-1 overflow-table"></div>
              <div className="col-xl-4 col-lg-4 col-md-4 overflow-table">
                <div className="dashboard-content inventory content-tab">
                  <canvas ref={chartRef} width="200" height="200"></canvas>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

export default Dash;
