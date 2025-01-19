import PageTitle from "../../components/PageTitle";
import useTrainers from "../../hooks/useTrainers";
import TrainerBanner from "./TrainerBanner";

const Trainers = () => {
  const [trainers] = useTrainers();
  console.log(trainers)
  return (
    <>
      <div className="container mx-auto py-5">
        <PageTitle title="Trainers" subTitle="Checkout our best trainers who are experienced" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {trainers?.map(each => (
                 <div key={each.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
                    {/* Image Column */}
                    <div className="aspect-[4/3] w-full">
                        <img 
                            src={each.photoURL} 
                            alt={each.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-3 space-y-2">
                        {/* Name Column */}
                        <h3 className="text-lg font-medium text-gray-800">
                            {each.name}
                        </h3>
                        
                        {/* Details Column */}
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {each.biodata}
                        </p>
                    </div>
                    <div className="border-b-2 mt-3 mb-2"></div>
                    <div className="p-3 space-y-2">
                      
                    </div>
                 </div>
               ))}
            </div>
        <TrainerBanner />
      </div>
    </>
  );
};

export default Trainers;
