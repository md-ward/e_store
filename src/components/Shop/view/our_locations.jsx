import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OurLocations = () => {

    const locations = [
        { city: 'City of Something ', address: 'at bla bla street ' },
        { city: 'City of Something ', address: 'at bla bla street ' },
        { city: 'City of Something ', address: 'at bla bla street ' }]

    return (
        <div className="h-screen ">
            <div className="mx-auto  flex flex-col justify-center w-full  bg-white pt-24 mt-4">

                <h1 className="text-dark-blue text-2xl font-sans text-center p-2 mb-6">OurLocations</h1>

                <section className="flex flex-row justify-center gap-4 flex-wrap">

                    {
                        locations.map((item, index) => (

                            <span about="our shop adresses"

                            className="flex h-48 w-96 hover:shadow-lg hover:scale-105 bg-slate-400 justify-center items-center rounded-lg p-2 text-lg text-white gap-3"
                            
                            key={index}>
                                <FontAwesomeIcon icon={faMapPin} />
                                <h1>{item.city + index+' ' + item.address}</h1>
                            </span>




                        ))


                    }
                </section>

            </div>



        </div>

    );
}

export default OurLocations;