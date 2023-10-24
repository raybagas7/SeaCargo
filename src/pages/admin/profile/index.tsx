import Input from "@/components/Input/Input";
import InputImage from "@/components/InputImage/InputImage";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import SideBar from "@/components/SideBar/SideBar";
import { IAdminDataEdit } from "@/interface/users";
import { useAdmin } from "@/store/admin/useAdmin";
import { getCookie } from "cookies-next";
import React, { ReactElement, useState } from "react";
import { GiShipWheel } from "react-icons/gi";

import { LiaUserEditSolid, LiaCheckSolid } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import { RiImageEditLine } from "react-icons/ri";
import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/Layout/AdminLayout";

const index: NextPageWithLayout = () => {
  const userData = useAdmin.use.adminData();
  const resetState = useAdmin.use.resetState();
  const updateAdminData = useAdmin.use.updateAdminData();
  const updateImage = useAdmin.use.updateImage();
  const editImage = useAdmin.use.editImage();
  const toggleEditImg = useAdmin.use.toggleEditImg();
  const [editData, setEditData] = useState<IAdminDataEdit>({
    email: undefined,
    fullname: undefined,
    phone: undefined,
  });
  const [profileImg, setProfileImg] = useState<File>();
  const [previewImg, setPreviewImg] = useState<string>();
  const [saveImage, setSaveImage] = useState<boolean>(false);
  const edit = useAdmin.use.edit();
  const toggleEdit = useAdmin.use.toggleEdit();

  const onChangeEditData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setEditData({ ...(editData as IAdminDataEdit), [key]: e.target.value });
  };

  const handleToggleEdit = () => {
    toggleEdit();
    if (userData) {
      setEditData({
        email: userData.email,
        fullname: userData.fullname,
        phone: userData.phone,
      });
    }
  };

  const onModelImgChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      console.log(file);
      setProfileImg(file);
      setPreviewImg(URL.createObjectURL(file));
      toggleEditImg();
    } else {
      return;
    }
  };

  const handleSaveImageProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCookie("accessToken");

    updateImage(token as string, profileImg as File);
    toggleEditImg();
  };

  const handleSaveEditedProfile2 = (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCookie("accessToken");
    resetState();
    updateAdminData(token as string, editData);
  };
  console.log(userData);

  return (
    <div className="flex justify-center">
      {userData ? (
        <div className="h-screen w-[375px] shadow">
          <div className=" h-full px-5 pt-24 shadow">
            <div className="relative px-3 py-6 shadow">
              <button
                onClick={handleToggleEdit}
                className="absolute -right-3 -top-3 flex animate-default_quantum_bouncing cursor-pointer items-center justify-center rounded-full border-[1px] border-prim-light bg-prim-light p-1 text-prim-libg transition-colors hover:bg-prim-libg hover:text-prim-light hover:transition-colors"
              >
                <LiaUserEditSolid className="h-5 w-5" />
              </button>

              <div className="flex w-full items-center justify-between">
                <form
                  onSubmit={(e) => handleSaveImageProfile(e)}
                  className="relative h-20 w-20"
                >
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={previewImg ? previewImg : userData.photo}
                    alt={userData.fullname}
                  />
                  {edit && (
                    <div className="absolute top-0 flex h-20 w-20 items-end justify-center overflow-hidden rounded-full">
                      <InputImage
                        onChange={(e) => onModelImgChange(e)}
                        name="profile-img"
                      />
                    </div>
                  )}
                  {editImage && (
                    <button
                      type="submit"
                      className="absolute -bottom-3 -right-3 z-50 flex animate-default_quantum_bouncing cursor-pointer items-center justify-center rounded-full border-[1px] border-prim-light bg-prim-light p-1 text-prim-libg transition-colors hover:bg-prim-libg hover:text-prim-light hover:transition-colors"
                    >
                      <RiImageEditLine className="h-3 w-3" />
                    </button>
                  )}
                </form>
                <div className="flex-1 pl-10">
                  {edit ? (
                    <form onSubmit={(e) => handleSaveEditedProfile2(e)}>
                      <div className="flex h-8 items-center">
                        <Input
                          small
                          wmax
                          name="fullname"
                          value={editData?.fullname}
                          onChange={(e) => onChangeEditData(e, "fullname")}
                        />
                      </div>
                      <div className="flex h-8 items-center">
                        <Input
                          small
                          wmax
                          name="email"
                          value={editData?.email}
                          onChange={(e) => onChangeEditData(e, "email")}
                        />
                      </div>
                      <div className="flex h-8 items-center">
                        <Input
                          small
                          wmax
                          name="phone"
                          value={editData?.phone}
                          onChange={(e) => onChangeEditData(e, "phone")}
                        />
                      </div>
                      {edit && (
                        <button
                          type="submit"
                          // onClick={handleSaveEditedProfile}
                          className="absolute -bottom-3 -right-3 flex animate-default_quantum_bouncing cursor-pointer items-center justify-center rounded-full border-[1px] border-prim-light bg-prim-light p-1 text-prim-libg transition-colors hover:bg-prim-libg hover:text-prim-light hover:transition-colors"
                        >
                          <LiaCheckSolid className="h-5 w-5" />
                        </button>
                      )}
                    </form>
                  ) : (
                    <>
                      <div className="flex h-8 items-center">
                        <p className="text-xs">{userData.fullname}</p>
                      </div>
                      <div className="flex h-8 items-center">
                        <p className="text-xs">{userData.email}</p>
                      </div>
                      <div className="flex h-8 items-center">
                        <p className="text-xs">{userData.phone}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen">
          <div className="flex h-full w-full items-center justify-center">
            <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default index;
