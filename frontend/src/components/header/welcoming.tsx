// possibly welcome doctor in the future ?

interface Greeting {
    doctorfirstname : string
    doctorlastname : string
}

export default function Welcoming({doctorfirstname, doctorlastname}: Greeting) { 

    const Welcoming = (doctor_name: string) => {
        const welcome = "Welcome " + doctor_name 
        return welcome
    }
    
    return (
    <>
    <h2>{("Welcome Dr. ").concat(doctorfirstname, ' ', doctorlastname)}</h2>
    </> )
  }