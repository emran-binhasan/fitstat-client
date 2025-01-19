import PageTitle from "../../components/PageTitle";
import TrainerBanner from "./TrainerBanner";

const Trainers = () => {
  return (
    <>
      <div className="container mx-auto py-5">
        <PageTitle title="Community" subTitle="Checkout all our forms here" />
        <TrainerBanner />
      </div>
    </>
  );
};

export default Trainers;
