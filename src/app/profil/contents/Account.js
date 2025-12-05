"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateUserAction } from "@/store/actionCreators";
import {
  fetchProvinces,
  fetchDistricts,
  fetchNeighborhoods
} from "@/api/provincesApi";
import SubmitButton from "@/components/form/SubmitButton";
import InputField from "@/components/form/InputField";
import SelectBox from "@/components/select";
import SELECTORS from "@/store/selectors";
import { LockIcon } from "@/icons";

function AccountContent({ editUserByAdmin }) {
  const dispatch = useDispatch();
  const stateUser = useSelector(SELECTORS.getUser);
  const user = editUserByAdmin || stateUser;

  const [formData, setFormData] = useState(user);
  const [formErrors, setFormErrors] = useState({
    name: false,
    password: false,
    phone: false,
    email: false,
    il: false,
    ilce: false,
    mahalle: false,
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const fetchedProvinces = await fetchProvinces();
        setProvinces(fetchedProvinces);
      } catch (error) {
        console.error("Provinces yüklenirken hata oluştu:", error);
      }
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    if (formData.il) {
      const loadDistricts = async () => {
        try {
          const selectedProvince = provinces.find((province) => province.name === formData.il);
          if (selectedProvince) {
            const fetchedDistricts = await fetchDistricts(selectedProvince.id);
            setDistricts(fetchedDistricts);
          }
        } catch (error) {
          console.error("İlçeler yüklenirken hata oluştu:", error);
        }
      };
      loadDistricts();
    }
  }, [formData.il, provinces]);

  useEffect(() => {
    if (formData.ilce) {
      const loadNeighborhoods = async () => {
        try {
          const selectedDistrict = districts.find((district) => district.name === formData.ilce);
          if (selectedDistrict) {
            const fetchedNeighborhoods = await fetchNeighborhoods(selectedDistrict.id);
            setNeighborhoods(fetchedNeighborhoods);
          }
        } catch (error) {
          console.error("Mahalleler yüklenirken hata oluştu:", error);
        }
      };
      loadNeighborhoods();
    }
  }, [formData.ilce, districts]);

  const validateField = () => {
    const errors = {};

    errors.name = !formData.name.trim();
    errors.password = !formData.password.trim();
    errors.phone = !formData.phone.trim();
    errors.email = !formData.email.trim();
    errors.il = !formData.il.trim();
    errors.ilce = !formData.ilce.trim();
    errors.mahalle = !formData.mahalle.trim();

    setFormErrors(errors);

    return !Object.values(errors).some((error) => error);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
    setFormErrors({ ...formErrors, [input]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateField()) return;
    const currentDate = moment().format("YYYY-DD-MM");

    const data = {
      ...formData,
      updated_at: currentDate,
    };
    dispatch(updateUserAction({ id: user.id, data }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 my-4 max-w-[500px]">
      <div className="flex flex-col gap-3">
        <InputField
          type="text"
          label="Ad Soyad"
          placeholder="Ad soyad giriniz.."
          errorMessage="Lütfen geçerli değer giriniz!"
          onChange={handleChange("name")}
          value={formData.name}
          isInvalid={formErrors.name}
          isRequired
        />
        <InputField
          type="tel"
          label="Telefon"
          placeholder="telefon no.."
          startContent={<span className="text-default-500 dark:text-dark-50 text-xs">+90</span>}
          onChange={handleChange("phone")}
          isInvalid={formErrors.phone}
          errorMessage="Lütfen geçerli değer giriniz!"
          value={formData.phone}
          isRequired
        />
        <InputField
          type="email"
          label="Mail Adresi"
          placeholder="Mail adresinizi giriniz.."
          errorMessage="Lütfen geçerli değer giriniz!"
          onChange={handleChange("email")}
          value={formData.email}
          isInvalid={formErrors.email}
          isRequired
        />
        <SelectBox
          label="İl"
          items={provinces.map((province) => ({
            id: province.name,
            label: province.name,
          }))}
          placeholder="İl Seçiniz"
          onChange={handleChange("il")}
          isInvalid={formErrors.il}
          errorMessage="Lütfen geçerli değer giriniz!"
          defaultSelectedKeys={[formData.il]}
          isRequired
        />
        <SelectBox
          label="İlçe"
          items={districts.map((district) => ({
            id: district.name,
            label: district.name,
          }))}
          placeholder="İlçe Seçiniz"
          onChange={handleChange("ilce")}
          defaultSelectedKeys={[formData.ilce]}
          isInvalid={formErrors.ilce}
          errorMessage="Lütfen geçerli değer giriniz!"
          isDisabled={!formData.il}
          isRequired
        />
        <SelectBox
          label="Mahalle"
          items={neighborhoods.map((neighborhood) => ({
            id: neighborhood.name,
            label: neighborhood.name,
          }))}
          placeholder="Mahalle Seçiniz"
          onChange={handleChange("mahalle")}
          defaultSelectedKeys={[formData.mahalle]}
          isInvalid={formErrors.mahalle}
          errorMessage="Lütfen geçerli değer giriniz!"
          isDisabled={!formData.ilce}
          isRequired
        />
        {editUserByAdmin && Number(user.isAdmin) === 0 && (
          <SelectBox
            label="Onay"
            items={[
              {
                id: '0',
                label: 'Onaysız',
              }, {
                id: '1',
                label: 'Onaylı',
              }
            ]}
            isRequired
            placeholder="Onay Seçiniz"
            onChange={handleChange("status")}
            defaultSelectedKeys={[formData.status]}
          />
        )}
        <InputField
          type="text"
          label="Kullanıcı ID"
          placeholder="Kullanıcı ID.."
          value={formData.uniqueCode}
          endContent={<LockIcon width={16} />}
          readOnly
          isDisabled
        />
      </div>
      <SubmitButton>Profili Kaydet</SubmitButton>
    </form>
  )
}
export default AccountContent;
