import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import clsx from "clsx";
import { styles } from '../../Styles/Stylesheet.css';
import { Autocomplete, Button, Checkbox, DialogContent, Divider, Paper, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { APIAddress } from '../../ApiVersion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const DialogBox = ({ open, formData, setFormData, setTableData, setSnackBarInfo, setIsLoading, setOpen, clickedCreate, handleDeleteRow }) => {
  const classes = styles();
  const [clickedCreatedIssues, setClickedCreatedIssues] = useState(false);
  const [fileName, setFileName] = useState();

  const handleClose = () => {
    setClickedCreatedIssues(false);
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: field == "owasp_weakness" ? value.map(keys => ({value: keys})) : value }));
  };

  const handlePOSTData = () => {
    setIsLoading(true);
    const { owasp_weakness, ...postData } = { ...formData, owasp: formData.owasp_weakness.map(keys => keys.value).join(",") };
    fetch(`${APIAddress}/api/v1/templates`,
      {
        method: "POST",
        body: JSON.stringify({ template: postData }),
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl9pZCI6MiwiZXhwIjoxNzYwOTgwNDgxfQ.x6HpeiH-3U5girByflMR0pskpAOPFT-NNPcNQR6R3tg",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        }
      })
      .then(response => response.json())
      .then(result => {
        setTableData(prevValue => [...prevValue, result.data.attributes.objects.data.attributes]);
        setSnackBarInfo({ open: true, severity: "success", message: result.data.attributes.summary });
        setOpen(false);
        setIsLoading(false);
      })
  };

  const handlePOSTCreateIssues = () => {
    setIsLoading(true);
    var { pss_ticket, test_execution_id, ...postData } = formData;
    postData.scanner_detection = [{ value: postData?.scanner_detection }];
    postData.impact_type = [{ value: postData?.impact_type }];
    postData.owasp_weakness = postData?.owasp_weakness.map(keys => (keys));
    postData = { bulk_create: { issues: [postData], pss_ticket: pss_ticket, test_execution_id: test_execution_id } };

    fetch(`${APIAddress}/api/v1/bulk_create`,
      {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl9pZCI6MiwiZXhwIjoxNzYwOTgwNDgxfQ.x6HpeiH-3U5girByflMR0pskpAOPFT-NNPcNQR6R3tg",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        }
      })
      .then(response => response.json())
      .then(result => {
        setSnackBarInfo({ open: true, severity: "success", message: result.data.attributes.summary });
        setOpen(false);
        setIsLoading(false);
      })
  };

  const handleUpdateFormData = () => {
    setIsLoading(true);
    const { owasp_weakness, ...postData } = { ...formData, owasp: formData.owasp_weakness.map(keys => keys.value).join(",") };
    fetch(`${APIAddress}/api/v1/templates/${postData.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ template: postData }),
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl9pZCI6MiwiZXhwIjoxNzYwOTgwNDgxfQ.x6HpeiH-3U5girByflMR0pskpAOPFT-NNPcNQR6R3tg",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        }
      })
      .then(response => response.json())
      .then(result => {
        setTableData(prevValue => prevValue.map(item =>
          item.id == result.data.attributes.objects.data.id ? result.data.attributes.objects.data.attributes : item
        ));
        setSnackBarInfo({ open: true, severity: "success", message: result.data.attributes.summary });
        setOpen(false);
        setIsLoading(false);
      })
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', background: 'rgb(39, 39, 39)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Form
          </Typography>
          {clickedCreate ? <Button style={{ background: 'green', color: 'white', margin: "0px 4px 0px 4px" }} onClick={handlePOSTData}>
            Create
          </Button> : <><Button style={{ background: 'green', color: 'white', margin: "0px 4px 0px 4px" }} onClick={() => {
            if (clickedCreatedIssues) {
              handlePOSTCreateIssues()
            } else {
              setClickedCreatedIssues(true);
            }
          }}>
            {clickedCreatedIssues ? "Create" : "Create Issues"}
          </Button>
            <Button style={{ background: '#344feb', color: 'white', margin: "0px 4px 0px 4px" }} onClick={handleUpdateFormData}>
              Update
            </Button>
            <Button style={{ background: 'red', color: 'white', margin: "0px 4px 0px 4px" }} onClick={() => handleDeleteRow(formData.id)}>
              Delete
            </Button></>}
        </Toolbar>
      </AppBar>
      <DialogContent
        style={{ background: 'rgb(57, 57, 57)' }}
      >
        {clickedCreatedIssues && <>
          <Typography>No of Issues</Typography>
          <TextField sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              }
            }
          }}
            type='number'
            variant="outlined"
            value={formData?.issues}
            onChange={(e) => handleChange('issues', e.target.value)}
          />

          <Typography>Issue No</Typography>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#ccc"
                },
                "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                  color: "#ccc",
                },
              }
            }}
            PaperComponent={({ children }) => (
              <Paper style={{ background: "rgb(39, 39, 39)" }}>{children}</Paper>
            )}
            options={["1", "2"]}
            renderInput={(params) => <TextField {...params} />}
            value={formData?.issue_no}
            onChange={(e, value) => handleChange('issue_no', value)}
          />

          <Typography>PSS Ticket</Typography>
          <TextField sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              }
            }
          }}
            fullWidth
            variant="outlined"
            value={formData?.pss_ticket}
            onChange={(e) => handleChange('pss_ticket', e.target.value)}
          />

          <Typography>Test Execution ID</Typography>
          <TextField sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              }
            }
          }}
            fullWidth
            variant="outlined"
            value={formData?.test_execution_id}
            onChange={(e) => handleChange('test_execution_id', e.target.value)}
          />
          <Divider style={{ background: "#ccc", margin: "30px 0px" }} />
        </>}

        <Typography>Summary</Typography>
        <TextField fullWidth sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#ccc"
            }
          }
        }}
          variant="outlined"
          value={formData?.summary} onChange={(e) => handleChange('summary', e.target.value)}
        />

        <Typography>Description</Typography>
        <TextField
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              }
            }
          }}
          multiline
          rows={4}
          value={formData?.description} onChange={(e) => handleChange('description', e.target.value)}
        />

        <Typography>Detection Method</Typography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              },
              "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                color: "#ccc",
              },
            }
          }}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "rgb(39, 39, 39)" }}>{children}</Paper>
          )}
          options={["Automation Framework", "Custom"]}
          renderInput={(params) => <TextField {...params} />}
          value={formData?.detection_method}
          onChange={(e, value) => handleChange('detection_method', value)}
        />

        <Typography>Scanner Detection</Typography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              },
              "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                color: "#ccc",
              },
            }
          }}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "rgb(39, 39, 39)" }}>{children}</Paper>
          )}
          options={["ADB (Andriod Debug Bridge)", "Anchore Engine", "AppSpider", "Attify Badge", "BinWalk", "Burp", "ChecSec", "CIS-CAT Pro", "Clair", "Defensics", "Docker Bench for Security", "DotPeek", "Echo Mirage", "Fiddler", "Ghidra", "JTAGulator", "JWT_Tool", "Kube-audit", "Kube-hunter", "MobSF", "Nessus", "Nexpose", "NMap", "PESecurity", "Process Hacker", "Qualys", "Scout Suite", "Sign Tool", "SQLMap", "Sysinternals", "WireShark", "Zap", "Other"]}
          renderInput={(params) => <TextField {...params} />}
          value={formData?.scanner_detection}
          onChange={(e, value) => handleChange('scanner_detection', value)}
        />

        <Typography>OWASP Weakness</Typography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              },
              "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                color: "#ccc",
              },
            }
          }}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "rgb(39, 39, 39)" }}>{children}</Paper>
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={props.id}>
              <Checkbox
                checkedIcon={
                  <span className={clsx(classes.icon, classes.checkedIcon)} />
                }
                icon={<span className={classes.icon} />}
                checked={selected}
              />

              {option}
            </li>
          )}
          multiple
          options={[
            "A:Broken Access Control",
            "A:Cryptographic Failures",
            "A:Identification and Authentication Failures",
            "A:Injection",
            "A:Insecure Design",
            "A:Security Logging and Monitoring Failures",
            "A:Security Misconfiguration",
            "A:Server-Side Request Forgery(SSRF)",
            "A:Software and Data Integrity Failures",
            "A:Vulnerable and Outdated Components",
            "I:Insecure Data Transfer and Storage",
            "I:Insecure Default Settings",
            "I:Insecure Ecosystem Interfaces",
            "I:Insecure Network Services",
            "I:Insufficient Privacy Protection",
            "I:Lack of Device Management",
            "I:Lack of Physical Hardening",
            "I:Lack of Secure Update Mechanism",
            "I:Use of Insecure or Outdated Components",
            "I:Weak Guessable, or Hardcoded Passwords",
            "M:Client code quality",
            "M:Improper Platform Usage",
            "M:Insecure Authentication",
            "M:Insecure Communication",
            "M:Insecure Data Storage",
            "M:Insufficient Authorization",
            "M:Insufficient Cryptography",
            "M:Code Tampering",
            "M:Reverse Engineering",
            "M:Extraneous Functionality",
            "A:Insecure Direct Object References",
            "A:Cross-Site Request Forgery (CSRF)",
            "A:Missing Function Level Access Control",
            "A:Unvalidated Redirects and Forwards",
            "A:Cross-Site Scripting (XSS)",
            "A:XML External Entities (XXE)",
            "A:Insecure Deserialization",
            "I:Insecure Cloud Interface",
            "I:Insecure Mobile Interface",
            "I:Insecure Software/Firmware",
            "I:Insecure Web Interface",
            "I:Insufficient Authentication/Authorization",
            "I:Insufficient Security Configurability",
            "I:Lack of Transport Encryption/Integrity Verification"
          ]}
          renderInput={(params) => <TextField {...params} />}
          value={formData?.owasp_weakness?.map(keys => keys?.value) || []}
          onChange={(e, value) => handleChange('owasp_weakness', value)}
        />

        <Typography>Threat Category</Typography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              },
              "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                color: "#ccc",
              },
            }
          }}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "rgb(39, 39, 39)" }}>{children}</Paper>
          )}
          options={[
            "Abuse",
            "Best Practice",
            "Denial of Service",
            "Elevation of Privilege",
            "Information Disclosure",
            "Process Deviation",
            "Repudiation",
            "Spoofing",
            "Tampering",
            "Untestable Scope",
            "User-defined"
          ]}
          renderInput={(params) => <TextField {...params} />}
          value={formData?.threat_category}
          onChange={(e, value) => handleChange('threat_category', value)}
        />

        <Typography>Impact Type</Typography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              },
              "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                color: "#ccc",
              },
            }
          }}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "rgb(39, 39, 39)" }}>{children}</Paper>
          )}
          options={[
            "Scope",
            "Other",
            "Safety",
            "Operational",
            "Quality",
            "Liability",
            "Security",
            "Revenue",
            "Cost",
            "Schedule"
          ]}
          renderInput={(params) => <TextField {...params} />}
          value={formData?.impact_type}
          onChange={(e, value) => handleChange('impact_type', value)}
        />

        <Typography>Impact</Typography>
        <TextField fullWidth sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#ccc"
            }
          }
        }}
          variant="outlined"
          value={formData?.impact}
          onChange={(e) => handleChange('impact', e.target.value)}
        />

        <Typography>CWE ID</Typography>
        <TextField fullWidth sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#ccc"
            }
          }
        }}
          value={formData?.cwe_id}
          onChange={(e) => handleChange('cwe_id', e.target.value)}
          variant="outlined"
        />

        <Typography>Threat Scope</Typography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              }
            },
            "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
              color: "#ccc",
            },
          }}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "rgb(39, 39, 39)" }}>{children}</Paper>
          )}
          options={[
            "Internal Production",
            "Internal Non Production",
            "Don't Know"
          ]}
          renderInput={(params) => <TextField {...params} />}
          value={formData?.threat_scope}
          onChange={(e, value) => handleChange('threat_scope', value)}
        />

        <Typography>CVSS Score</Typography>
        <TextField fullWidth sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#ccc"
            }
          }
        }}
          value={formData?.cvss_score}
          onChange={(e) => handleChange('cvss_score', e.target.value)}
          variant="outlined"
        />

        <Typography>PTC</Typography>
        <TextField fullWidth sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#ccc"
            }
          }
        }}
          value={formData?.ptc}
          onChange={(e) => handleChange('ptc', e.target.value)}
          variant="outlined"
        />

        {clickedCreatedIssues && <><Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          style={{ display: "flex", width: "10%", margin: "10px 0px" }}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => setFileName(event.target.files[0].name)}
          />
        </Button>
          <p>{fileName}</p>
        </>}

      </DialogContent>
    </Dialog>
  )
}

export default DialogBox