import MainPage from "@/layouts/MainPage";
import React from "react";
import KonsepSptProvider from "../konsep-spt-components/KonsepSptProvider";
import CreateKonsepSPT from "./CreateKonsepSPT";

export default function CreatePage() {
  return (
    <MainPage>
      <KonsepSptProvider>
        <CreateKonsepSPT />
      </KonsepSptProvider>
    </MainPage>
  );
}
