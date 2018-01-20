@component('mail::message')
# Add Diabetes Resource

<b>Full Name:</b> {{ $request['full_name'] }}<br/>
<b>Phone:</b> {{ $request['phone'] }}<br/>
<b>Resource Type:</b> {{ $request['resource_type'] }}<br/>
<b>Email:</b> {{ $request['email'] }}<br/>
<b>Resource URL:</b> {{ $request['resource_url'] }}<br/>
<b>How they found us:</b> {{ $request['found_us'] }}<br/>

@endcomponent
