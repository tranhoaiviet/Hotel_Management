import { useDispatch } from 'react-redux';
import FilterManagerBooking from './filterManagerBooking';
import SearchBar from './searchBarManagerBooking';
import { Breadcrumb } from 'antd';
import { search } from '../../../redux/actions/SearchAdmin';

function SearchFormBooking() {
    const dispatch = useDispatch()
    const onSubmit = (name) => {
        dispatch(search(name))
    }
    return (
        <>
            <Breadcrumb className='breadcrumb'>
                <Breadcrumb.Item className='breadcrumbItem'>Admin</Breadcrumb.Item>
                <Breadcrumb.Item className='breadcrumbItem'>Manager Booking</Breadcrumb.Item>
            </Breadcrumb>
            <div className="search-form-booking-main">
                <div className="search-form-booking-child">
                    <SearchBar onSubmit={onSubmit}/>
                    <FilterManagerBooking />
                </div>
            </div>
        </>
    )
}
export default SearchFormBooking;