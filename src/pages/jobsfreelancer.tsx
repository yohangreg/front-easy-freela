import styles from "../styles/JobsFreelancer.module.css";

import { useState, useEffect, useMemo } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar/NavBar";
import { IoSearchSharp } from "react-icons/io5";
import { FormControl, FormLabel, Button, ButtonGroup, Stack } from '@chakra-ui/react';
import authedAxiosClient from "@/components/clients/authedAxiosClient"
import { useRouter } from "next/router";

type Demand = {
    id: number;
    title: string;
    description: string;
    dead_line: string;
    phone: string;
    price: string;
    user_id: number;
}

export default function JobsFreelancerPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [demands, setDemands] = useState<Demand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const filteredDemand = useMemo(() => {
        if (!search) {
            return demands;
        }
        return demands.filter((demand) => {
            return demand.title.toLowerCase().includes(search.toLowerCase().trim());
        })
    }, [search,demands]);


    useEffect(() => {
        authedAxiosClient.get<{ message: string, data: Demand[] }>("/demand/show").then(({ data }) => {
            setDemands(data.data);
        });
    }, []);

    const handleSubmit = async () => {

    }

    return (
        <>
            <main>
                <NavBar />
                <div className={styles.jobsFreelancer_container}>
                    <div className={styles.banner}>
                        <h1 className={styles.title}>Projetos</h1>
                        <p>
                            Praesent cursus bibendum nisl tempor efficitur. Pellentesque eget
                            aliquet lorem. Praesent fringilla justo sit amet diam sollicitudin
                            elementum. Mauris sed pharetra tellus.
                        </p>
                        <h2 className={styles.road_line} />
                    </div>

                    <div className={styles.banner_search}>
                        <input
                            type="search"
                            className={styles.input}
                            placeholder="Pesquisar projetos..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div>
                            <button
                                // onClick={handleSubmit}
                                className={styles.favicon}
                                type="submit">
                                <i>
                                    <IoSearchSharp />
                                </i>
                            </button>
                        </div>
                    </div>


                    {filteredDemand?.map((demand) => (

                        <div key={demand.id} className={styles.demands}>
                            <div className={styles.demandPrice}>
                                <h1>R$ {demand.price}</h1>
                            </div>

                            <div className={styles.titleDemand}>
                                <h1>{demand!.title}</h1>
                            </div>

                            <div className={styles.demandDescription}>
                                <h1>{demand.description}</h1>
                            </div>

                            <div className={styles.demandButton}>
                                <Button 
                                    onClick={() => {
                                        return router.push({
                                            pathname:"/candidatejob",
                                            query: {
                                                demand_id: demand.id
                                            }
                                        })
                                    }}
                                    className={styles.button}
                                    variant="unstyled"
                                >
                                    <p>Enviar Candidatura</p>
                                </Button>
                            </div>
                        </div>
                    ))}

                </div>
            </main>
            <Footer />
        </>
    )
}