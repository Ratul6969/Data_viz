import { useState, useEffect } from 'react';

export default function GraphImages({ sampleText }) {
  // Sample images for different chart types
  const images = {
    bar: "/api/placeholder/600/400",
    pie: "/api/placeholder/600/400",
    line: "/api/placeholder/600/400",
    scatter: "/api/placeholder/600/400",
    default: "/api/placeholder/600/400"
  };

  // Determine image URL based on keywords in sampleText
  const getImageForText = (text = "") => {
    if (!text) return images.default;
    
    const textLower = text.toLowerCase();
    
    if (textLower.includes("bar chart") || textLower.includes("bar graph"))
      return images.bar;
    if (textLower.includes("pie chart"))
      return images.pie;
    if (textLower.includes("line graph") || textLower.includes("line chart"))
      return images.line;
    if (textLower.includes("scatter plot") || textLower.includes("scatter chart"))
      return images.scatter;
    
    return images.default;
  };

  const [currentImage, setCurrentImage] = useState(getImageForText(sampleText));
  const [chartType, setChartType] = useState("default");

  useEffect(() => {
    // Update image whenever sampleText changes
    if (sampleText) {
      setCurrentImage(getImageForText(sampleText));
      
      // Determine chart type for title display
      const textLower = sampleText.toLowerCase();
      if (textLower.includes("bar chart") || textLower.includes("bar graph"))
        setChartType("Bar Chart");
      else if (textLower.includes("pie chart"))
        setChartType("Pie Chart");
      else if (textLower.includes("line graph") || textLower.includes("line chart"))
        setChartType("Line Graph");
      else if (textLower.includes("scatter plot") || textLower.includes("scatter chart"))
        setChartType("Scatter Plot");
      else
        setChartType("Data Visualization");
    }
  }, [sampleText]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2 text-center">{chartType}</h3>
      <div className="relative bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
        <img 
          src={currentImage}
          alt={`${chartType} Preview`}
          className="w-full h-auto rounded border border-gray-200 dark:border-gray-600 transition-all duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-bold">Sample {chartType}</p>
            <p className="text-sm mt-2">Login to generate custom visualizations</p>
          </div>
        </div>
      </div>
    </div>
  );
}