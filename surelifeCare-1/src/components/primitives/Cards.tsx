import { Card } from "flowbite-react";
import type { Contract } from "../../types/contract";

interface CardsProps {
  contract: Contract;
}

interface ParsedFeature {
  text: string;
  indent?: number;
}

interface JsonFeature {
  Text?: string;
  Indent?: number;
}

function Cards({ contract }: CardsProps) {
  const parseFeatures = (featuresString: string): ParsedFeature[] => {
    try {
      const trimmedString = featuresString.trim();

      // Parse the initial JSON string
      let parsed: unknown = JSON.parse(trimmedString);

      // Handle case where the parsed result is a string (nested JSON)
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }

      // Ensure parsed is an array
      if (!Array.isArray(parsed)) {
        return [{ text: String(parsed), indent: 0 }];
      }

      // Map the parsed array to ParsedFeature objects
      return parsed.flatMap((item: unknown): ParsedFeature[] => {
        if (typeof item === 'string') {
          return [{ text: item, indent: 0 }];
        }

        if (typeof item === 'object' && item !== null) {
          const featureObj = item as JsonFeature;

          // If the Text field contains a JSON string, parse it recursively
          if (featureObj.Text && featureObj.Text.trim().startsWith('[')) {
            try {
              return parseFeatures(featureObj.Text); // Recursive call
            } catch {
              return [{ text: featureObj.Text, indent: featureObj.Indent || 0 }];
            }
          }

          return [{
            text: featureObj.Text || 'No text provided',
            indent: featureObj.Indent || 0
          }];
        }

        return [{ text: String(item), indent: 0 }];
      });
    } catch (error) {
      console.error('Error parsing features:', error);
      return [{ text: featuresString, indent: 0 }];
    }
  };

  const getIndentClass = (indent?: number): string => {
    if (!indent) return "";
    const indentClasses: { [key: number]: string } = {
      1: "ml-4",
      2: "ml-8",
      3: "ml-12",
      4: "ml-16",
    };
    return indentClasses[indent] || "";
  };

  const formatPrice = (price: number): string => {
    return `₱${price.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const getImageSrc = (imageData: string): string => {
    if (!imageData) return '';
    
    if (imageData.startsWith('data:image/')) {
      return imageData;
    }
    
    if (imageData.startsWith('/9j/') || imageData.length > 1000) {
      return `data:image/jpeg;base64,${imageData}`;
    }
    
    return imageData;
  };

  const features = parseFeatures(contract.features);
  const imageSrc = getImageSrc(contract.imageData);

  return (
    <Card
      className="max-w-sm scrol bg-slate-50 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 min-h-[400px] flex flex-col transform hover:-translate-y-1 p-0 border border-green-950"
    >
      <div className="w-full aspect-[4/3] overflow-hidden p-0 m-0 rounded-t-lg">
        <img 
          src={imageSrc} 
          alt={contract.imageAlt}
          className="w-full h-full object-cover block p-0 m-0"
        />
      </div>
      
      <div 
        className="text-left p-4 flex flex-col justify-between h-full flex-1 
                   border border-green-950 rounded-b-lg border-t-0"
      >
        <div>
          <div className={`flex flex-col items-start ${contract.subtitle ? 'mb-2' : 'mb-4'} transition-all duration-200`}>
            <div className="flex justify-between items-center w-full gap-2 mb-1">
              <h1 className="text-xl font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 flex-1">
                {contract.title}
              </h1>
              {(contract.price !== undefined && contract.price !== null) && (
                <span className="bg-green-100 text-green-800 text-lg font-bold px-2.5 py-0.5 rounded-lg transform hover:scale-105 transition-transform duration-200 whitespace-nowrap">
                  {formatPrice(contract.price)}
                </span>
              )}
            </div>
            {contract.subtitle && (
              <span className="bg-green-100 text-green-800 text-md font-bold px-2.5 py-0.5 rounded-full transform hover:scale-105 transition-transform duration-200">
                {contract.subtitle}
              </span>
            )}
          </div>

          <h5 className="text-md font-bold tracking-tight text-gray-900 mb-4 group">
            <span className="group-hover:text-gray-700 transition-colors duration-200">
              {contract.description}
            </span>
          </h5>

          {features.length > 0 && (
            <ul className="font-normal text-sm text-gray-700 space-y-2">
              {features.map((feature: ParsedFeature, index: number) => (
                <li 
                  key={index} 
                  className={`${getIndentClass(feature.indent)} transform hover:translate-x-1 transition-transform duration-200 hover:text-gray-900`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  • {feature.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="w-fit bg-[#0A400C] hover:bg-green-900 text-white text-sm font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 mt-4 active:scale-95">
          AVAIL NOW
        </button>
      </div>
    </Card>
  );
}

export default Cards;