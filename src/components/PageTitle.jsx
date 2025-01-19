
const PageTitle = ({title, subTitle}) => {
    return (
        <div>
            <h3 className="text-3xl font-medium">{title}</h3>
            <p>{subTitle}</p>
        </div>
    );
};

export default PageTitle;