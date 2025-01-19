import useClasses from "../../hooks/useClasses";

;

const Classes = () => {
    const [classes] = useClasses();
    console.log(classes)
    return (
        <div className="lg:w-11/12 mx-auto px-4 py-8">
            Classes
        </div>
    );
};

export default Classes;