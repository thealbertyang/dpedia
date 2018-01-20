@component('mail::message')
# Doctors Start Here

<b>Full Name:</b> {{ $request['full_name'] }}<br/>
<b>Phone:</b> {{ $request['phone'] }}<br/>
<b>Role:</b> {{ $request['role'] }}<br/>
<b>Email:</b> {{ $request['email'] }}<br/>
<b>Practice Name:</b> {{ $request['practice_name'] }}<br/>
<b>How they found us:</b> {{ $request['found_us'] }}<br/>

@endcomponent
