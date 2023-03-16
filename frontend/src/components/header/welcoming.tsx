// possibly welcome doctor in the future ?

interface GreetingDoctor {
    doctorfirstname : string
    doctorlastname : string
}

export function WelcomingDoctor({doctorfirstname, doctorlastname}: GreetingDoctor) { 

    const Welcoming = (doctor_name: string) => {
        const welcome = "Welcome " + doctor_name 
        return welcome
    }
    return (
    <>
        <h2>{("Welcome Dr. ").concat(doctorfirstname, ' ', doctorlastname)}</h2>
    </> )
  }


interface GreetingPatient {
    patientfirstname : string 
    patientlastname : string
    doctorfirstname : string
    doctorlastname : string
}

export function WelcomingPatient({patientfirstname, patientlastname, doctorfirstname, doctorlastname}: GreetingPatient){
    return (
    <>
        <h3>{("Scans of patient ").concat(patientfirstname, ' ', patientlastname, '\n')}</h3>
        <h4>{("under supervision of Dr. ").concat(doctorfirstname, " ", doctorlastname)} </h4>
    </>
        )
}
