import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle';
import { useForm } from 'react-hook-form';

const AddClass = () => {
    const {register, handleSubmit,reset,formState:{errors}} = useForm();
    const onSubmit = d => console.log(d)
    return (
        <div className="flex flex-col justify-center items-center border">
        <DashboardTitle title='Add Class'/>
        <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 p-5 mx-auto border">

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Class Name *</label>
          <input
            {...register("name", { required: "Class name is required" })}
            type="text"
            placeholder="Enter class name"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-600 font-medium">Class Image*</label>
            <input
              className="w-full border p-3 rounded-md"
              type="file" name="image" required
              {...register('image')}
            />
          </div>
      </div>


      <div>
        <label className="block text-gray-600 font-medium">Details *</label>
        <textarea
          {...register("details", { required: "Details is required" })}
          placeholder="Write about the class..."
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 h-32"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition duration-500"
      >
        Add Class
        </button>
    </form>
    </div>
    );
};

export default AddClass;