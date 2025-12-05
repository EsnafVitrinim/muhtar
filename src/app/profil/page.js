import AccountContent from "./contents/Account";
import EditPassword from "./contents/EditPassword";
import TabMenu from "@/components/tabs";

export default function Account({ editUserByAdmin }) {
  const tabs = [
    {
      id: "profile",
      label: "Profil",
      content: <AccountContent editUserByAdmin={editUserByAdmin} />
    },
    {
      id: "password",
      label: "Şifre Değiştir",
      content: <EditPassword editUserByAdmin={editUserByAdmin} />
    }
  ];

  return (
    <div className="flex w-full flex-col pt-4">
      <TabMenu tabs={tabs} />
    </div>
  );
}
