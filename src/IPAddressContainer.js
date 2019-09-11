import React, {Component} from "react";

var xhr;

class IPAddressContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip_address: "...",
        };

        this.procesRequest = this.processRequest.bind(this);
    }

    componentDidMount () {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "https://ipinfo.io/json", true);
        xhr.send(); 
        // Error: 429 Too many request
        // 왜?!?!

        // {
        //     "ip": "112.168.63.75",
        //     "city": "Suwon",
        //     "region": "Gyeonggi-do",
        //     "country": "KR",
        //     "loc": "37.2859,127.0100",
        //     "org": "AS4766 Korea Telecom",
        //     "postal": "16258",
        //     "timezone": "Asia/Seoul",
        //     "readme": "https://ipinfo.io/missingauth"
        // }

        xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    processRequest() {
        // console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            this.setState({
                ip_address: response.ip
            });
        }
    }

    render() {
        return (
            <p>{this.state.ip_address}</p>
        );
    }
}

export default IPAddressContainer;