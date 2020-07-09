import React from 'react';
import GoogleMapContainer from "./GoogleMapContainer";
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import {useDispatch} from "react-redux";
import {addPlace} from "../../actions";
import {useRouter} from "next/router";

function GooglePlaces() {
    const dispatch = useDispatch();
    const router = useRouter();

    const getPlaceInfo = placeInfo => {
        dispatch(addPlace(placeInfo));
    }

    const handleSubmit = () => {
        router.push('/third-step');
    }

    return (
        <>
            <Formik
                initialValues={{
                    place: '',
                }}
                onSubmit={(values, {setSubmitting, setFieldValue}) => {
                    setFieldValue('place','')
                    setTimeout(() => {
                        setSubmitting(false);
                        handleSubmit()
                    }, 1000);
                }}
            >
                {({submitForm, isSubmitting }) => (
                    <Form style={{display: "flex"}}>
                        <Field
                            component={TextField}
                            id="autocomplete"
                            name="place"
                            type="text"
                            label="Place"
                            variant="outlined"
                        />
                        {isSubmitting && <LinearProgress/>}
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            <GoogleMapContainer addPlaceInfo={getPlaceInfo}/>
        </>

    );
}

export default GooglePlaces;