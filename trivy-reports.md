### Trivy scan

#### Backend

```
trivy image --scanners vuln ghcr.io/sibelly/girus-backend:0.1
```

```
2025-06-06T19:49:24-04:00	INFO	[vuln] Vulnerability scanning is enabled
2025-06-06T19:49:33-04:00	INFO	Number of language-specific files	num=1
2025-06-06T19:49:33-04:00	INFO	[gobinary] Detecting vulnerabilities...

Report Summary

┌───────────────┬──────────┬─────────────────┐
│    Target     │   Type   │ Vulnerabilities │
├───────────────┼──────────┼─────────────────┤
│ girus-backend │ gobinary │        0        │
└───────────────┴──────────┴─────────────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)
```

#### Frontend

```
trivy image --scanners vuln ghcr.io/sibelly/girus-frontend:0.1
```

```
2025-06-06T20:32:42-04:00	INFO	[vuln] Vulnerability scanning is enabled
2025-06-06T20:32:44-04:00	INFO	Detected OS	family="alpine" version="3.21.3"
2025-06-06T20:32:44-04:00	INFO	[alpine] Detecting vulnerabilities...	os_version="3.21" repository="3.21" pkg_num=68
2025-06-06T20:32:44-04:00	INFO	Number of language-specific files	num=0

Report Summary

┌────────────────────────────────────────────────────┬────────┬─────────────────┐
│                       Target                       │  Type  │ Vulnerabilities │
├────────────────────────────────────────────────────┼────────┼─────────────────┤
│ ghcr.io/sibelly/girus-frontend:0.1 (alpine 3.21.3) │ alpine │        2        │
└────────────────────────────────────────────────────┴────────┴─────────────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)


ghcr.io/sibelly/girus-frontend:0.1 (alpine 3.21.3)

Total: 2 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 2, CRITICAL: 0)

┌─────────┬────────────────┬──────────┬────────┬───────────────────┬───────────────┬───────────────────────────────────────────────────────────┐
│ Library │ Vulnerability  │ Severity │ Status │ Installed Version │ Fixed Version │                           Title                           │
├─────────┼────────────────┼──────────┼────────┼───────────────────┼───────────────┼───────────────────────────────────────────────────────────┤
│ libxml2 │ CVE-2025-32414 │ HIGH     │ fixed  │ 2.13.4-r5         │ 2.13.4-r6     │ libxml2: Out-of-Bounds Read in libxml2                    │
│         │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2025-32414                │
│         ├────────────────┤          │        │                   │               ├───────────────────────────────────────────────────────────┤
│         │ CVE-2025-32415 │          │        │                   │               │ libxml2: Out-of-bounds Read in xmlSchemaIDCFillNodeTables │
│         │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2025-32415                │
└─────────┴────────────────┴──────────┴────────┴───────────────────┴───────────────┴───────────────────────────────────────────────────────────┘
```

#### Girus k8s with istio

```
trivy image --scanners vuln ghcr.io/sibelly/girus-k8s-istio:0.1 
```

```
2025-06-06T20:31:02-04:00	INFO	[vuln] Vulnerability scanning is enabled
2025-06-06T20:31:04-04:00	INFO	Detected OS	family="alpine" version="3.22.0"
2025-06-06T20:31:04-04:00	WARN	This OS version is not on the EOL list	family="alpine" version="3.22"
2025-06-06T20:31:04-04:00	INFO	[alpine] Detecting vulnerabilities...	os_version="3.22" repository="3.22" pkg_num=93
2025-06-06T20:31:04-04:00	INFO	Number of language-specific files	num=10
2025-06-06T20:31:04-04:00	INFO	[gobinary] Detecting vulnerabilities...
2025-06-06T20:31:04-04:00	WARN	Using severities from other vendors for some vulnerabilities. Read https://trivy.dev/v0.63/docs/scanner/vulnerability#severity-selection for details.

Report Summary

┌─────────────────────────────────────────────────────┬──────────┬─────────────────┐
│                       Target                        │   Type   │ Vulnerabilities │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ ghcr.io/sibelly/girus-k8s-istio:0.1 (alpine 3.22.0) │  alpine  │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/containerd                            │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/containerd-shim-runc-v2               │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/ctr                                   │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/docker                                │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/docker-proxy                          │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/dockerd                               │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/kind                                  │ gobinary │       17        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/bin/runc                                  │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/libexec/docker/cli-plugins/docker-buildx  │ gobinary │        0        │
├─────────────────────────────────────────────────────┼──────────┼─────────────────┤
│ usr/local/libexec/docker/cli-plugins/docker-compose │ gobinary │        0        │
└─────────────────────────────────────────────────────┴──────────┴─────────────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)


usr/local/bin/kind (gobinary)

Total: 17 (UNKNOWN: 0, LOW: 0, MEDIUM: 14, HIGH: 2, CRITICAL: 1)

┌──────────────────┬────────────────┬──────────┬────────┬────────────────────────────────────┬───────────────────────────────────┬──────────────────────────────────────────────────────────────┐
│     Library      │ Vulnerability  │ Severity │ Status │         Installed Version          │           Fixed Version           │                            Title                             │
├──────────────────┼────────────────┼──────────┼────────┼────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ golang.org/x/sys │ CVE-2022-29526 │ MEDIUM   │ fixed  │ v0.0.0-20210630005230-0f9fa26af87c │ 0.0.0-20220412211240-33da011f77ad │ golang: syscall: faccessat checks wrong group                │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2022-29526                   │
├──────────────────┼────────────────┼──────────┤        ├────────────────────────────────────┼───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ stdlib           │ CVE-2024-24790 │ CRITICAL │        │ v1.20.13                           │ 1.21.11, 1.22.4                   │ golang: net/netip: Unexpected behavior from Is methods for   │
│                  │                │          │        │                                    │                                   │ IPv4-mapped IPv6 addresses                                   │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-24790                   │
│                  ├────────────────┼──────────┤        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2023-45288 │ HIGH     │        │                                    │ 1.21.9, 1.22.2                    │ golang: net/http, x/net/http2: unlimited number of           │
│                  │                │          │        │                                    │                                   │ CONTINUATION frames causes DoS                               │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2023-45288                   │
│                  ├────────────────┤          │        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-34156 │          │        │                                    │ 1.22.7, 1.23.1                    │ encoding/gob: golang: Calling Decoder.Decode on a message    │
│                  │                │          │        │                                    │                                   │ which contains deeply nested structures...                   │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-34156                   │
│                  ├────────────────┼──────────┤        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2023-45289 │ MEDIUM   │        │                                    │ 1.21.8, 1.22.1                    │ golang: net/http/cookiejar: incorrect forwarding of          │
│                  │                │          │        │                                    │                                   │ sensitive headers and cookies on HTTP redirect...            │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2023-45289                   │
│                  ├────────────────┤          │        │                                    │                                   ├──────────────────────────────────────────────────────────────┤
│                  │ CVE-2023-45290 │          │        │                                    │                                   │ golang: net/http: golang: mime/multipart: golang:            │
│                  │                │          │        │                                    │                                   │ net/textproto: memory exhaustion in                          │
│                  │                │          │        │                                    │                                   │ Request.ParseMultipartForm                                   │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2023-45290                   │
│                  ├────────────────┤          │        │                                    │                                   ├──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-24783 │          │        │                                    │                                   │ golang: crypto/x509: Verify panics on certificates with an   │
│                  │                │          │        │                                    │                                   │ unknown public key algorithm...                              │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-24783                   │
│                  ├────────────────┤          │        │                                    │                                   ├──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-24784 │          │        │                                    │                                   │ golang: net/mail: comments in display names are incorrectly  │
│                  │                │          │        │                                    │                                   │ handled                                                      │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-24784                   │
│                  ├────────────────┤          │        │                                    │                                   ├──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-24785 │          │        │                                    │                                   │ golang: html/template: errors returned from MarshalJSON      │
│                  │                │          │        │                                    │                                   │ methods may break template escaping                          │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-24785                   │
│                  ├────────────────┤          │        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-24789 │          │        │                                    │ 1.21.11, 1.22.4                   │ golang: archive/zip: Incorrect handling of certain ZIP files │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-24789                   │
│                  ├────────────────┤          │        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-24791 │          │        │                                    │ 1.21.12, 1.22.5                   │ net/http: Denial of service due to improper 100-continue     │
│                  │                │          │        │                                    │                                   │ handling in net/http                                         │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-24791                   │
│                  ├────────────────┤          │        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-34155 │          │        │                                    │ 1.22.7, 1.23.1                    │ go/parser: golang: Calling any of the Parse functions        │
│                  │                │          │        │                                    │                                   │ containing deeply nested literals...                         │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-34155                   │
│                  ├────────────────┤          │        │                                    │                                   ├──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-34158 │          │        │                                    │                                   │ go/build/constraint: golang: Calling Parse on a "// +build"  │
│                  │                │          │        │                                    │                                   │ build tag line with...                                       │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-34158                   │
│                  ├────────────────┤          │        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-45336 │          │        │                                    │ 1.22.11, 1.23.5, 1.24.0-rc.2      │ golang: net/http: net/http: sensitive headers incorrectly    │
│                  │                │          │        │                                    │                                   │ sent after cross-domain redirect                             │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-45336                   │
│                  ├────────────────┤          │        │                                    │                                   ├──────────────────────────────────────────────────────────────┤
│                  │ CVE-2024-45341 │          │        │                                    │                                   │ golang: crypto/x509: crypto/x509: usage of IPv6 zone IDs can │
│                  │                │          │        │                                    │                                   │ bypass URI name...                                           │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2024-45341                   │
│                  ├────────────────┤          │        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2025-22866 │          │        │                                    │ 1.22.12, 1.23.6, 1.24.0-rc.3      │ crypto/internal/nistec: golang: Timing sidechannel for P-256 │
│                  │                │          │        │                                    │                                   │ on ppc64le in crypto/internal/nistec                         │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2025-22866                   │
│                  ├────────────────┤          │        │                                    ├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2025-22871 │          │        │                                    │ 1.23.8, 1.24.2                    │ net/http: Request smuggling due to acceptance of invalid     │
│                  │                │          │        │                                    │                                   │ chunked data in net/http...                                  │
│                  │                │          │        │                                    │                                   │ https://avd.aquasec.com/nvd/cve-2025-22871                   │
└──────────────────┴────────────────┴──────────┴────────┴────────────────────────────────────┴───────────────────────────────────┴──────────────────────────────────────────────────────────────┘
```