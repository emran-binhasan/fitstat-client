import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useTheUser from "../../hooks/useTheUser";
import Swal from "sweetalert2";

const skillsOptions = [
  { value: "hiit", label: "HIIT Blast" },
  { value: "yoga", label: "Yoga Flow" },
  { value: "pilates", label: "Pilates Core" },
  { value: "kickboxing", label: "Cardio Kickboxing" },
  { value: "zumba", label: "Zumba Dance" },
  { value: "spin", label: "Spin Cycle" },
  { value: "barre", label: "Barre Fitness" },
  { value: "meditation", label: "Meditation & Mindfulness" },
  { value: "crossfit", label: "CrossFit Fundamentals" },
  { value: "powerlifting", label: "Powerlifting Basics" },
  { value: "calisthenics", label: "Calisthenics Strength" },
  { value: "strength_training", label: "Strength Training" },
  { value: "weightlifting", label: "Olympic Weightlifting" },
  { value: "core", label: "Core Blast" },
  { value: "combat", label: "Body Combat" },
  { value: "bodybuilding", label: "Bodybuilding Techniques" },
  { value: "endurance", label: "Endurance Training" },
  { value: "functional_fitness", label: "Functional Fitness" },
  { value: "mobility", label: "Mobility & Flexibility" },
];

const daysOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const timeOptions = [
  { value: "Morning", label: "Morning" },
  { value: "Noon", label: "Noon" },
  { value: "Afternoon", label: "Afternoon" },
  { value: "Evening", label: "Evening" },
];

const socialLinksOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
];

const TrainerForm = () => {
  const [userData, refetch] = useTheUser();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: [],
      availableDays: [],
      socialLinks: [],
      socialLinksUrls: {},
    },
  });

  const selectedSocialLinks = watch("socialLinks") || [];

  useEffect(() => {
    if (user?.email) {
      reset({ email: user.email });
    }
  }, [user, reset, refetch]);

  const onSubmit = async (data) => {
    const formattedSocialLinks = data.socialLinks.map(link => ({
      platform: link.value,
      url: data.socialLinksUrls[link.value] || ""
    }));
   
    await axiosSecure.patch(`/user/${userData._id}`, {
      name: data.name,
      photoURL: data.photoURL,
      age:data.age,
      availableSlots:{
        days: data.availableDays?.map(each => each.value) || [],
        time: data.availableTime.value
      },
      experience:data.experience,
      skills: data.skills?.map(skill => skill.value) || [],
      socialLinks: formattedSocialLinks,
      biodata: data.biodata,
      status: "pending",
    }).then(res => {
     if(res.data.modifiedCount){
     Swal.fire({
               title: 'Great',
               text: 'Application succesfull',
               icon: 'success',
               confirmButtonText: 'Ok',
             });
     }
    })
  };

 
  return (
    <>
    {userData.status?
   <div className="w-3/4 mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    <h2>You have already applied !</h2>
    </div>
    :
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
      Trainer Registration
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Name & Email */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Name *</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Enter full name"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            readOnly
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Photo URL & Age */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Photo URL *</label>
          <input
            {...register("photoURL", { required: "Photo URL is required" })}
            type="url"
            placeholder="Image URL"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Age *</label>
          <input
            {...register("age", { required: "Age is required", min: 18 })}
            type="number"
            placeholder="Enter age"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-600 font-medium">Skills *</label>
        <Controller
          name="skills"
          control={control}
          rules={{ required: "Please select at least one skill" }}
          render={({ field }) => (
            <Select {...field} options={skillsOptions} isMulti className="w-full" />
          )}
        />
        {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
      </div>

      {/* Available Days */}
      <div>
        <label className="block text-gray-600 font-medium">Available Days *</label>
        <Controller
          name="availableDays"
          control={control}
          rules={{ required: "Please select at least one day" }}
          render={({ field }) => (
            <Select {...field} options={daysOptions} isMulti className="w-full" />
          )}
        />
        {errors.availableDays && (
          <p className="text-red-500 text-sm">{errors.availableDays.message}</p>
        )}
      </div>

      {/* Social Links */}
      <div>
        <label className="block text-gray-600 font-medium">Social Links</label>
        <Controller
          name="socialLinks"
          control={control}
          render={({ field }) => (
            <Select {...field} options={socialLinksOptions} isMulti className="w-full" />
          )}
        />
        
        {/* Social Links URLs */}
        {selectedSocialLinks.length > 0 && (
          <div className="mt-2 space-y-2">
            {selectedSocialLinks.map((platform) => (
              <div key={platform.value} className="flex gap-2 items-center">
                <span className="text-sm text-gray-600 w-24">{platform.label}:</span>
                <input
                  {...register(`socialLinksUrls.${platform.value}`)}
                  type="url"
                  placeholder={`Enter ${platform.label} URL`}
                  className="flex-1 p-2 border rounded focus:ring focus:ring-blue-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Experience & Available Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Experience (Years) *</label>
          <input
            {...register("experience", { required: "Experience is required" })}
            type="number"
            placeholder="Years of experience"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>


        <div>
          <label className="block text-gray-600 font-medium">Available Time *</label>
          <Controller name="availableTime" control={control}
          rules={{required: 'Please select a time'}}
          render={({field}) => (<Select {...field} options={timeOptions} className="w-full"/>)}/>
        </div>
      </div>

      {/* Biodata */}
      <div>
        <label className="block text-gray-600 font-medium">Biodata *</label>
        <textarea
          {...register("biodata", { required: "Biodata is required" })}
          placeholder="Write a short bio..."
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 h-24"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded  hover:bg-green-700 transition duration-500"
      >
        Submit
      </button>
    </form>
  </div>}
    </>
  )
};

export default TrainerForm;