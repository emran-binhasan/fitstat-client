import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useTheUser from "../../../../hooks/useTheUser";
import useClasses from "../../../../hooks/useClasses";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import DashboardTitle from "../../../../components/DashboardTitle";
import Swal from "sweetalert2";

// GET USER DATA
const AddSlot = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // GET OLD DATA
  const [oldData] = useTheUser();

  // DESTRUCTURE OLD DATA
  const { name, age, photoURL, email, skills, biodata, hoursPerDay,_id } =
    oldData || {};

  // GET CLASSES
  const [classes] = useClasses();

  // CLASS TO OPTION FOR REACT SELECT
  const classLists = classes.map((classItem) => ({
    value: classItem._id,
    label: classItem.name,
  }));

  const daysOptions =
    oldData.availableDays?.map((day) => ({ value: day, label: day })) || [];

  const availableTime = parseInt(hoursPerDay);
  console.log(typeof availableTime);

  const axiosSecure = useAxiosSecure();

  const onSubmit = async(data) => {
    const slotData = {
      selectedClasses: data.selectedClasses,
      slotTime: data.slotTime,
      slotName: data.slotName,
      slotDay: data.slotDay,
    }
    const res = await axiosSecure.patch(`/user/slot/${_id}`,slotData )
    console.log(data);
    if(res.data.modifiedCount){
       Swal.fire({
                  title: "Succesfull",
                  text: "Added",
                  icon: "success",
                  confirmButtonText: "Ok",
                });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center border">
      <Helmet>
        <title>FitStat | Add Slot</title>
      </Helmet>
      <DashboardTitle title='Add New Slot'/>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 w-4/5 p-5 mx-auto border">
          {/* Name & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium">Name *</label>
              <input
                type="text"
                defaultValue={name}
                readOnly
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                defaultValue={email}
                readOnly
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 bg-gray-200"
              />
            </div>
          </div>

          {/* Photo URL & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium">
                Photo URL *
              </label>
              <input
                type="url"
                defaultValue={photoURL}
                readOnly
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Age *</label>
              <input
                type="number"
                defaultValue={age}
                readOnly
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 bg-gray-200"
              />
            </div>
          </div>
          <div>
            {/* Skills */}
            <label className="block font-medium">Skills *</label>
            <div className="grid grid-cols-2 gap-2">
              {skills?.map((skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    disabled
                    checked
                    value={skill}
                    className="w-4 h-4 mr-2 accent-orange-400"
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Bio *</label>
            <input
              type="text"
              defaultValue={biodata}
              readOnly
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300 bg-gray-200"
            />
          </div>

          {/* Select Days */}
          <div>
            <label className="block text-gray-600 font-medium">
              Select Days *
            </label>
            <select
              {...register("slotDay", { required: "Please select a day" })}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            >
              <option value="">Select a day</option>
              {oldData.availableDays?.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {errors.slotDay && (
              <p className="text-red-500 text-sm">{errors.slotDay.message}</p>
            )}
          </div>

          {/* Slot Name */}
          <div>
            <label className="block text-gray-600 font-medium">
              Slot Name *
            </label>
            <input
              {...register("slotName", { required: "Slot name is required" })}
              type="text"
              placeholder="Example: Morning Slot"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
            {errors.slotName && (
              <p className="text-red-500 text-sm">{errors.slotName.message}</p>
            )}
          </div>

          {/* Slot Time */}
          <div>
            <label className="block text-gray-600 font-medium">
              Slot Time *
            </label>
            <input
              {...register("slotTime", {
                required: "Slot time is required",
                max: {
                  value: availableTime, // Ensure availableTime is a number
                  message: `Maximum available time is ${availableTime} hours`,
                },
              })}
              type="text"
              placeholder="Example: 1 Hour"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
            {errors.slotTime && (
              <p className="text-red-500 text-sm">{errors.slotTime.message}</p>
            )}
          </div>

          {/* Classes Include */}
          <div>
            <label className="block text-gray-600 font-medium">
              Classes Include *
            </label>
            <Controller
              name="selectedClasses"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={classLists}
                  isMulti
                  className="w-full"
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-green-700 transition duration-500"
          >
            Submit
          </button>
        </form>
      </div>
  
  );
};

export default AddSlot;
