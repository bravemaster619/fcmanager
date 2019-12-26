const server_root = "http://192.168.0.254/fcmanager/";

export default {
    signUpUri: server_root + 'register',
    loginUri: server_root + 'login',
    getAllFacs: server_root + 'student/facility/getall',
    getFreeTimeSlot: server_root + 'student/facility/getFreeTimeSlot',
    bookingUri: server_root + 'student/booking/book',
    getHistory: server_root + 'student/booking/getHistory',
    bookingDetail: server_root + 'student/booking/detail',
    bookingUpdate: server_root + 'student/booking/update',
    bookingCancel: server_root + 'student/booking/cancel',
    getProfile: server_root + 'profile/get_profile',
    profileUpdate: server_root + 'profile/update',
    resetPassword: server_root + 'forgotten/resetpassword',
    ratingUri: server_root + 'student/facility/giverating/',
    announceList: server_root + 'announcement/get_announce_list',
    getAnnounceDetail: server_root + 'announcement/detail',
    outstandingList: server_root + 'outstanding/get',
    currentBookinglist: server_root + 'student/booking/getCurrentBooking',
    currentBookingUpdate: server_root + '/student/booking/update',
    currentBookingCancel: server_root + '/booking/cancel/'
}
