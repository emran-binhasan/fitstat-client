
const PageTitle = ({title, subTitle}) => {
    return (
        <div className="border text-center mb-5">
            <h3 className="text-3xl font-medium">{title}</h3>
            <p>{subTitle}</p>
        </div>
    );
};

export default PageTitle;