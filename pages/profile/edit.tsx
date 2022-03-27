import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useUser from "@libs/client/useUser";
import { mutate } from "swr";
import useMutation from "@libs/client/useMutation";
import Swal from "sweetalert2";
import Router, { useRouter } from "next/router";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user?.email);
    if (user?.phone) setValue("phone", user?.phone);
    if (user?.name) setValue("name", user?.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/Jbn0son-X4aW02A0_gVqgA/${user?.avatar}/avatar`
      );
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  //const onValid = (form: EditProfileForm) => {
  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      // ask for CF URL
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      // change except avatar
      editProfile({
        email,
        phone,
        name,
      });
    }
  };
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  const router = useRouter();
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]; // typeof File
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    } else if (data && data.ok) {
      Swal.fire("", "정보수정 완료").then(async (result) => {
        await router.push("/profile");
      });
    }
  }, [data, setError]);
  return (
    <Layout canGoBack title="Edit Profile">
      <form className="space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-14 w-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="avatar"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              {...register("avatar")}
              id="avatar"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 block font-semibold text-red-500">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button isLoading={loading} text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
