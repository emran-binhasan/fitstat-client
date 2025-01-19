import PageTitle from "../../components/PageTitle";
import TrainerBanner from "./TrainerBanner";

const Trainers = () => {
  return (
    <>
      <div className="container mx-auto py-5">
        <PageTitle title="Trainers" subTitle="Checkout our best trainers who are experienced" />
        <TrainerBanner />
      </div>
    </>
  );
};

export default Trainers;
