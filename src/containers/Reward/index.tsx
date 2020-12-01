import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Form, Input, DatePicker, Spin } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";

import { putReward } from "store/actions";

import "./style.css";

const dateFormat = "MM/DD/YYYY";

function Reward() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.rewards?.loading);
  const rewards = useSelector((state) => state.rewards?.data);
  const reward = rewards?.find((item) => item.id == id) || {};

  const initialValues = {
    experience: reward.experience,
    user: reward.user,
    status: reward.status,
    date: reward.date ? moment(reward.date, dateFormat) : moment(),
    id: reward.id,
  };
  const validationSchema = yup.object().shape({
    experience: yup.string().nullable().required(),
    user: yup.number().nullable().required(),
    status: yup.string().nullable().required(),
    date: yup.string().nullable().required(),
  });

  function onSubmit(values) {
    dispatch(
      putReward({
        values: { ...values, date: values["date"].format(dateFormat) },
        id,
      })
    );
  }

  return (
    <Spin spinning={isLoading}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          values,
          touched,
          errors,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <div className="form">
              <h2 className="form__title">Reward info</h2>
              <Form.Item
                className="form__item"
                validateStatus={errors["experience"] ? "error" : ""}
              >
                <Input
                  name="experience"
                  value={values["experience"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Experience"
                />
                {errors["experience"] && touched["experience"] && (
                  <p className="form__error">{errors["experience"]}</p>
                )}
              </Form.Item>
              <Form.Item
                className="form__item"
                validateStatus={errors["status"] ? "error" : ""}
              >
                <Input
                  name="status"
                  value={values["status"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Status"
                />
                {errors["status"] && touched["status"] && (
                  <p className="form__error">{errors["status"]}</p>
                )}
              </Form.Item>
              <Form.Item
                className="form__item"
                validateStatus={errors["date"] ? "error" : ""}
              >
                <DatePicker
                  name="date"
                  value={values["date"]}
                  onChange={(val) => setFieldValue("date", val)}
                  placeholder="Date"
                  format={dateFormat}
                />
                {errors["date"] && touched["date"] && (
                  <p className="form__error">{errors["date"]}</p>
                )}
              </Form.Item>
            </div>
            <div className="form__footer">
              <button
                type="button"
                // @ts-ignore
                onClick={handleSubmit}
                className="form__button"
              >
                Update
              </button>
            </div>
          </>
        )}
      </Formik>
      <p>
        <NavLink to={"/rewards"}>Go back</NavLink>
      </p>
    </Spin>
  );
}

export default Reward;
