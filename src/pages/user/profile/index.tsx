import Input from "@/components/Input/Input";
import InputImage from "@/components/InputImage/InputImage";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { IUserDataEdit } from "@/interface/users";
import { getCookie } from "cookies-next";
import React, { ReactElement, useState } from "react";
import { GiShipWheel } from "react-icons/gi";
import { LiaUserEditSolid, LiaCheckSolid } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import { RiImageEditLine } from "react-icons/ri";
import { useUser } from "@/store/user/useUser";
import CircleButton from "@/components/CircleButton/CircleButton";
import { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout/Layout";

const index: NextPageWithLayout = () => {
  const userData = useUser.use.userData();
  const resetState = useUser.use.resetState();
  const updateUserData = useUser.use.updateUserData();
  const updateImage = useUser.use.updateImage();
  const editImage = useUser.use.editImage();
  const toggleEditImg = useUser.use.toggleEditImg();
  const [editData, setEditData] = useState<IUserDataEdit>({
    email: undefined,
    fullname: undefined,
    phone: undefined,
  });
  const [profileImg, setProfileImg] = useState<File>();
  const [previewImg, setPreviewImg] = useState<string>();
  const edit = useUser.use.edit();
  const toggleEdit = useUser.use.toggleEdit();

  const onChangeEditData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setEditData({ ...(editData as IUserDataEdit), [key]: e.target.value });
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

  const handleSaveEditedProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCookie("accessToken");
    resetState();
    updateUserData(token as string, editData);
  };
  console.log(userData);

  return (
    <main className="flex justify-center">
      <LoadingScreen />
      {userData ? (
        <div className="h-screen w-[375px] shadow">
          <div className=" h-full px-5 pt-24 shadow">
            <div className="relative px-3 py-6 shadow">
              <div className="absolute -right-3 -top-3 ">
                <CircleButton name="user-edit" onClick={handleToggleEdit}>
                  <LiaUserEditSolid className="h-5 w-5" />
                </CircleButton>
              </div>

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
                    <div className="absolute -bottom-3 -right-3 ">
                      <CircleButton name="edit-image" type="submit">
                        <RiImageEditLine className="h-3 w-3" />
                      </CircleButton>
                    </div>
                  )}
                </form>
                <div className="flex-1 pl-10">
                  {edit ? (
                    <form onSubmit={(e) => handleSaveEditedProfile(e)}>
                      <div className="flex h-8 items-center">
                        <Input
                          small
                          wmax
                          required
                          name="fullname"
                          type="text"
                          value={editData?.fullname}
                          onChange={(e) => onChangeEditData(e, "fullname")}
                        />
                      </div>
                      <div className="flex h-8 items-center">
                        <Input
                          small
                          wmax
                          required
                          type="email"
                          name="email"
                          value={editData?.email}
                          onChange={(e) => onChangeEditData(e, "email")}
                        />
                      </div>
                      <div className="flex h-8 items-center">
                        <Input
                          small
                          wmax
                          required
                          type="number"
                          name="phone"
                          value={editData?.phone}
                          onChange={(e) => onChangeEditData(e, "phone")}
                        />
                      </div>
                      {edit && (
                        <div className="absolute -bottom-3 -right-3">
                          <CircleButton name="save-edit" type="submit">
                            <LiaCheckSolid className="h-5 w-5" />
                          </CircleButton>
                        </div>
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
        <div className="h-screen w-full">
          <div className="flex h-full w-full items-center justify-center">
            <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
          </div>
        </div>
      )}
      <ToastContainer />
    </main>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;