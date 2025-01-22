
import { Helmet } from "react-helmet-async";
import PageTitle from "../../components/PageTitle";
import useClasses from "../../hooks/useClasses";

import ClassTrainers from "./ClassTrainers";

const Classes = () => {
    const [classes] = useClasses();

    return (
        <div className="container mx-auto py-5">
                 <Helmet>
                    <title>FitStat | Classes</title>
                  </Helmet>
            <PageTitle title='Classes' subTitle='Checkout all our classes now!'/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {classes?.map(each => (
                 <div key={each.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
                    {/* Image Column */}
                    <div className="aspect-[4/3] w-full">
                        <img 
                            src={each.image} 
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
                            {each.details}
                        </p>
                    </div>
                    <div className="border-b-2 mt-3 mb-2"></div>
                    <div className="p-1 gap-2 flex items-center">
                        <ClassTrainers name={each.name} classId={each._id}/>
                    </div>
                 </div>
               ))}
            </div>
        </div>
    );
};

export default Classes;