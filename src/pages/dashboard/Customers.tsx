import { useState, useEffect } from 'react';

// COMPONENTS
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';
import axios from 'axios'

// PAGE STYLES
import '../../styles/Customer.css'

// ICONS
import { RiUserSearchFill } from "react-icons/ri";

export default function Customers() {
    const [visibleRows, setVisibleRows] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const pageSize = 4;

    const [customers, setCustomers] = useState([]);

    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [searchTerm, setSearchTerm] = useState('');

    const totalPages = Math.ceil(filteredCustomers.length / pageSize);

    useEffect(() => {
        // Filter customers based on the search term
        const filtered = customers.filter((customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCustomers(filtered);
        setCurrentPage(1); // Reset page to 1 when search term changes
    }, [searchTerm, customers]);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const userData = await axios.get('http://localhost:4001/api/v1/customers/')
                
                let structuredData = []
                
                for(let i in userData.data){
                    structuredData.push({
                        id: userData.data[i].username,
                        picture: userData.data[i].picture ? userData.data[i].picture : "https://github.com/shadcn.png",
                        name: userData.data[i].username,
                    })
                }
                setCustomers(customers.concat(structuredData))
                setIsLoading(false)
            }catch(err){
                console.log("Failed to fetch data\n", err)
            }
        }
        fetchData()
    },[])

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setVisibleRows((prevVisibleRows) => prevVisibleRows + pageSize);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setVisibleRows((prevVisibleRows) => prevVisibleRows - pageSize);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    

    return (
        !isLoading &&
        <>
        <div className='customers-container'>
            <section className='customers-searchBar'>
                <span><RiUserSearchFill className="customers-search-icon"/></span>
                <span><Input placeholder='Search Customer' onChange={(e) => setSearchTerm(e.target.value)} /></span>
            </section>
            <section>
                <Table style={{ width: '800px' }}>
                    <TableCaption>
                        A list of your Customers.
                    </TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Picture</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((customer) => (
                        <TableRow key={customer.id}>
                        <TableCell className="font-large">
                            <Avatar>
                            <AvatarImage src={customer.picture} />
                            </Avatar>
                        </TableCell>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell className="text-right">
                            <Link to={`/Customers/${customer.name}`}><Button>See More</Button></Link>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </section>
            <section className='customers-pageButtons'>
                    <Button onClick={handlePrevClick}>Previous</Button>
                    <Button onClick={handleNextClick}>Next</Button>
            </section>
        </div>
        </>
    );
}
