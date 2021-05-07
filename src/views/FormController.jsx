import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {getFormData} from "../graphql/queries"; 
import Form1 from "../forms/form1/Form1";
import Form2 from "../forms/form2/Form2";
import Form3 from "../forms/form3/Form3";
import Loader from "../components/Loader/Loader"

const FormController = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([])

  useEffect(() => {
    handleForms();
  }, []);

  const handleForms = async () => {
    try {
      
      const getFormsData = await API.graphql(graphqlOperation(getFormData, {
        id: props.match.params.id
      }));

      setFormData(getFormsData.data.getFormData);
      console.log('getFormsData',getFormsData.data.getFormData);
      setLoading(false);
        
    } catch (err) {
      console.log(err);
      
      
    }
  };

  const renderFormType = (formtype) => {
   
    console.log('formtype:', formtype);
    switch (formtype) {
      case "REBNY COVID Liability Form":
        return <Form1 formItem={formData}/>;
      case "New York Agency Disclosure Form for Buyer and Seller":
        return <Form2 formItem={formData} />;
      case "REBNY COVID Health Screening Form":
        return <Form3 />;

      default:
        return "NOt Found!";
    }
    
    
  };
  // console.log(props.match.params.id);
  if (loading) return <Loader />;
  return renderFormType(formData.formName);
  
};
export default FormController;
 
