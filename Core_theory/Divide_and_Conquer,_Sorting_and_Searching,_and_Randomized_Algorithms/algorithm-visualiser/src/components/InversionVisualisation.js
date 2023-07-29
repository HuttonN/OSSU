import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

function CodeVisualization() {
  const [num, setNum] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    // Define your initial code here
    const initialCode = `
      function factorial(n) {
        if (n === 0) {
          return 1;
        } else {
          return n * factorial(n - 1);
        }
      }

      const result = factorial(${num || 0});
      console.log(result);
    `;

    // Split the code into lines
    const codeLines = initialCode.split('\n');
    setLines(codeLines);

    // Remove any previous animation
    d3.selectAll('.line').interrupt().remove();

    // Animate the code visualization
    const animationContainer = d3.select('#animation-container');

    codeLines.forEach((line, index) => {
      animationContainer
        .append('div')
        .text(line.replace('${num || 0}', num ? num.toString() : ''))
        .attr('class', `line ${index === currentLine ? 'highlight' : ''}`)
        .style('opacity', 0)
        .style('transform', 'translateX(-100px)')
        .transition()
        .delay(index * 1000)
        .duration(500)
        .style('opacity', 1)
        .style('transform', 'translateX(0px)');
    });
  }, [num, currentLine]);

  const handleNumChange = (event) => {
    setNum(event.target.value);
    setCurrentLine(0); // Reset current line when the user changes the number
  };

  const handleStepClick = () => {
    setCurrentLine((prevLine) => Math.min(prevLine + 1, lines.length - 1));
  };

  return (
    <div className="container">
      <div className="code-container">
        <pre className="code" id="code">
          {/* Display your code here */}
          {`
            function factorial(n) {
              if (n === 0) {
                return 1;
              } else {
                return n * factorial(n - 1);
              }
            }

            const result = factorial(${num || 0});
            console.log(result);
          `}
        </pre>
      </div>
      <div className="animation-container" id="animation-container">
        <div className="arrow" style={{ opacity: currentLine === 0 ? 1 : 0 }}>
          &gt;
        </div>
      </div>
      <div className="controls">
        <label>
          Input Number:
          <input type="number" value={num} onChange={handleNumChange} />
        </label>
        <button onClick={handleStepClick} disabled={currentLine >= lines.length - 1}>
          Next Step
        </button>
      </div>
    </div>
  );
}

export default CodeVisualization;