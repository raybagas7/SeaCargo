import Button from "@/components/Button/Button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function index() {
  const router = useRouter();
  useEffect(() => {
    deleteCookie("accessToken");
  }, []);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <p>401 | Unauthorized Token Expired</p>
      <Button
        type="button"
        onClick={() => router.push("/entry")}
        primary
        name="goto-entry"
        large
      >
        Go to Enty Page
      </Button>
    </div>
  );
}

export default index;
