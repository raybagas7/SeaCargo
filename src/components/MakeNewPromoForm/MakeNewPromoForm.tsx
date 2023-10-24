import React from "react";
import Input from "../Input/Input";
import { IPromosForm } from "@/interface/promos";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";
import { getCookie } from "cookies-next";
import { useAdmin } from "@/store/admin/useAdmin";

interface IMakeNewPromoForm {
  promoData: IPromosForm;
  onChangePromoData: (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    key: string,
  ) => void;
  resetForm: () => void;
}

function MakeNewPromoForm({
  promoData,
  onChangePromoData,
  resetForm,
}: IMakeNewPromoForm) {
  const { createPromo } = useAdmin.getState();

  const handleSubmitNewPromo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getCookie("accessToken");
    createPromo(token as string, promoData);
    resetForm();
  };
  return (
    <form
      onSubmit={handleSubmitNewPromo}
      className="min-h-[80%] w-[50%] space-y-5 rounded-lg border-[1px] border-border-light p-10 shadow-md"
    >
      <h2 className="border-b-2 border-border-light p-3 text-center text-xl font-bold text-prim-light dark:border-border-dark dark:text-prim-dark">
        Create New Promo
      </h2>
      <div className="flex gap-5">
        <div className="flex-1">
          <Input
            value={promoData.name}
            type="text"
            name="promo-name"
            required
            label="Promo Name"
            normal
            wmax
            onChange={(e) => onChangePromoData(e, "name")}
          />
        </div>

        <div className="flex-1">
          <Input
            value={promoData.count}
            type="number"
            name="count"
            required
            label="Count"
            normal
            wmax
            meter={<p>pcs</p>}
            onChange={(e) => onChangePromoData(e, "count")}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <Input
            wmax
            value={promoData.value}
            type="number"
            min={1}
            max={100}
            required
            name="discount-value"
            label="Discount Value"
            normal
            onChange={(e) => onChangePromoData(e, "value")}
          />
        </div>

        <div className="flex-1">
          <Input
            value={promoData.max}
            type="number"
            name="max-discount"
            required
            label="Max Discount"
            normal
            min={1000}
            onChange={(e) => onChangePromoData(e, "max")}
          />
        </div>
      </div>

      <TextArea
        value={promoData.description}
        name="description"
        required
        label="Description"
        onChange={(e) => onChangePromoData(e, "description")}
      />

      <div className="mt-5 flex justify-center">
        <Button type="submit" name="submit-promo" normal primary>
          Create
        </Button>
      </div>
    </form>
  );
}

export default MakeNewPromoForm;
