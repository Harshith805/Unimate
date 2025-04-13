export const data = {
    "id": null,
    "type": "responder",
    "attributes": {
        "summary": "Successfully fetched Template",
        "code": 200,
        "objects": {
            "data": [
                {
                    "id": "7",
                    "type": "template",
                    "attributes": {
                        "id": 7,
                        "summary": "Missing CSP",
                        "description": "Application has no CSP",
                        "detection_method": "Custom",
                        "owasp": "A:Broken Access Control,A:Cryptographic Failures",
                        "scanner_detection": "ADB (Android Debug Bridge)",
                        "threat_category": "Abuse",
                        "impact_type": "Security",
                        "impact": "XSS attacks are simple",
                        "cwe_id": "CWE-56",
                        "cvss_score": "CVSS:3.0/AV:N/AC:H/PR:L/UI:N/S:C/C:H/I:H/A:L",
                        "ptc": "someptc",
                        "owasp_weakness": [
                            {
                                "value": "A:Broken Access Control"
                            },
                            {
                                "value": "A:Cryptographic Failures"
                            }
                        ]
                    }
                },
                {
                    "id": "24",
                    "type": "template",
                    "attributes": {
                        "id": 24,
                        "summary": "Missing HSTS",
                        "description": "HSTS is missing from the entire application",
                        "detection_method": "Automation Framework",
                        "owasp": "A:Injection,A:Identification and Authentication Failures",
                        "scanner_detection": "Burp",
                        "threat_category": "Best Practice",
                        "impact_type": "Security",
                        "impact": "Man in the Middle Attacks can be easily exploitable.",
                        "cwe_id": "CWE-89",
                        "cvss_score": "CVSS:3.0/AV:A/AC:L/PR:H/UI:N/S:U/C:L/I:L/A:N",
                        "ptc": "PTC-10",
                        "owasp_weakness": [
                            {
                                "value": "A:Injection"
                            },
                            {
                                "value": "A:Identification and Authentication Failures"
                            }
                        ]
                    }
                },
                {
                    "id": "26",
                    "type": "template",
                    "attributes": {
                        "id": 26,
                        "summary": "Missing X-Frame Options",
                        "description": "Missing X-Frame Options",
                        "detection_method": "Custom",
                        "owasp": "A:Broken Access Control,A:Identification and Authentication Failures",
                        "scanner_detection": "Burp",
                        "threat_category": "Best Practice",
                        "impact_type": "Security",
                        "impact": "Clickjacking possible",
                        "cwe_id": "CWE-89",
                        "cvss_score": "CVSS:3.0/AV:A/AC:L/PR:H/UI:N/S:U/C:L/I:L/A:N",
                        "ptc": "PTC-11",
                        "owasp_weakness": [
                            {
                                "value": "A:Broken Access Control"
                            },
                            {
                                "value": "A:Identification and Authentication Failures"
                            }
                        ]
                    }
                }
            ],
            "meta": {
                "current_page": 1,
                "next_page": null,
                "prev_page": null,
                "total_pages": 1,
                "total_count": 3
            }
        }
    }
}