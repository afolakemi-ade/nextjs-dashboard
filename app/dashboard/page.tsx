'use client';

import styles from './newDashboard.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function NewDashboard() {
    const [country, setCountry] =useState<any[]>([]);
    const [loading, setLoading] = useState(true);


useEffect(() => {
  const storedCountry = Cookies.get('countryData');
  if (storedCountry) {
    setCountry(JSON.parse(storedCountry));
    setLoading(false);
    return;
  }

  async function fetchCountry() {
    try {
      const response = await axios.get('https://staging-api.payfusion.io/mobipurse/public/v1/countries');
      const result = response.data;
      if (result.statusCode === 200) {
        setCountry(result.data.countries);
       Cookies.set('countryData', JSON.stringify(result.data.countries));
;
      }
    } catch (error) {
      console.error('Error fetching country:', error);
    } finally {
      setLoading(false);
    }
  }

  fetchCountry();
}, []);
return (
        <div className={styles.container}>
            <h1 className={styles.name}>My Dashboard</h1>
        
            {loading ? (
                <p className={styles.loading}>Loading country data...</p>
            ) : (
                    <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Country Code</th>
                            <th>Phone Number Code</th>
                            <th>Currency Code</th>
                            <th>Currency</th>

                            </tr>
                            
                    </thead>
                            <tbody>
                                {country.map((country, index) => (
                                    <tr key={index}>
                                        <td>{ country.country}</td>
                                        <td>{country.countryCode}</td>
                                        <td>{country.phoneNumberCode}</td>
                                        <td>{country.currencyCode}</td>
                                        <td>{country.currency}</td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>

    );
}