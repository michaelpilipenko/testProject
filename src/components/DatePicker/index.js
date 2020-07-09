import * as React from 'react';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import { Persist } from 'formik-persist'
import { addHours } from 'date-fns'
import {useRouter} from "next/router";
import {Button, LinearProgress} from '@material-ui/core';
import {DateTimePicker,} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useDispatch, useSelector} from "react-redux";
import DateFnsUtils from '@date-io/date-fns';
import {addCheckin, addCheckout} from "../../actions";

const dateTimeSchema = Yup.object().shape({
    dateTimeCheckin: Yup.date()
        .min(addHours(Date.now(), 2), 'Not available date')
        .required('Required'),
    dateTimeCheckout: Yup.date()
        .min(addHours(Date.now(), 6), 'Not available date')
        .test('checkDate', 'The total time of booking must be more than 4 hour', function(value){
            const { dateTimeCheckin } = this.parent;
            console.log(dateTimeCheckin, value)
            return addHours(dateTimeCheckin, 4) <= value;
        })
        .required('Required')
});

function Index() {
    const { checkin, checkout } = useSelector(state => state.reservation);
    const dispatch = useDispatch();
    const router = useRouter()
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik
                initialValues={{
                    dateTimeCheckin: checkin,
                    dateTimeCheckout: checkout,
                }}
                validationSchema={dateTimeSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        dispatch(addCheckin(values.dateTimeCheckin))
                        dispatch(addCheckout(values.dateTimeCheckout))
                        router.push('/second-step');
                    }, 1000);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <div  style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                            <Field
                                component={DateTimePicker}
                                name="dateTimeCheckin"
                                label="Label number one"
                                value={checkin}
                                inputVariant="outlined"
                                disablePast
                            />
                            <br/>
                            <Field
                                component={DateTimePicker}
                                name="dateTimeCheckout"
                                value={checkout}
                                label="label number two"
                                inputVariant="outlined"
                                disablePast
                            />
                        </div>
                        {isSubmitting && <LinearProgress />}
                        <br />
                        <div  style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Submit
                            </Button>
                        </div>
                        <Persist name="dateTime-form" />
                    </Form>
                )}
            </Formik>
        </MuiPickersUtilsProvider>
    );
};

export default Index
