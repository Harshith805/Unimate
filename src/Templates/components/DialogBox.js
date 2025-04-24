import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from '@mui/material/Slide';
import clsx from "clsx";
import { styles } from '../../Styles/Stylesheet.css';
import { Autocomplete, Box, Button, Checkbox, DialogContent, Divider, Paper, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { APIAddress } from '../../ApiVersion';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './QuillCustom.css';
import { remark } from "remark";

import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

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

const DialogBox = ({ open, formData, setFormData, setTableData, setSnackBarInfo, setIsLoading, setOpen, clickedCreate, clickedCreatedIssues, setClickedCreatedIssues, formData1, setFormData1, formDummyData, setFormDummyData, handleDeleteRow }) => {
  const classes = styles();

  const [fileName, setFileName] = useState();

  const handleClose = () => {
    setClickedCreatedIssues();
    setOpen(false);
    setFormData1({ isVisible: false });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: field == "owasp_weakness" ? value.map(keys => ({ value: keys })) : value }));
  };

  const handleFormData1Change = (field, value) => {
    if (field == "issues") {
      if (value > 15) {
        setSnackBarInfo({ open: true, severity: "warning", message: "Max 15 issues can be created" });
        return;
      }
    };

    setFormData1((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddIssues = () => {
    setFormData1({ ...formData1, isVisible: true });
    setFormDummyData(Array.from({ length: formData1?.issues }, (_, i) => ({ ...formData, issue_no: i + 1 })));
  };

  const handleIssueNoChange = (field, value) => {
    if (formData?.issue_no) {
      setFormDummyData(formDummyData.map(keys => {
        if (keys.issue_no == formData.issue_no) {
          return { ...formData };
        } else {
          return keys;
        }
      }));
    }

    setFormData(formDummyData.filter(keys => keys.issue_no == value)[0]);
  };

  const handleTemplateChange = (field, value, summary) => {
    setFormDummyData(formDummyData.map(keys => {
      if (keys.id == value) {
        return formData;
      } else {
        return keys;
      }
    }));

    setFormData(formDummyData.filter(keys => keys.summary == summary)[0]);
  };

  const handleFileChange = (event) => {
    const files = event.target.files[0]; // multiple files
    let fileName = files.name, fileContent;
    if ((formData?.files || []).map(keys => keys.file_name).includes(fileName)) {
      setSnackBarInfo({ open: true, severity: "warning", message: "File already uploaded" });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      fileContent = reader.result
      setFormData({ ...formData, files: [...(formData?.files || []), { file_name: fileName, file_content: fileContent }] });
    };
  };

  const handleDeleteFile = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToDelete),
    }));
  };

  const htmlToMarkdown = (htmlText) => {
    const file = remark()
      .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
      .use(rehypeRemark)
      .use(remarkStringify)
      .processSync(htmlText);

    return String(file);
  }

  const handlePOSTData = () => {
    setIsLoading(true);
    let { owasp_weakness, ...postData } = { ...formData, owasp: formData.owasp_weakness.map(keys => keys.value).join(",") };
    postData.description = htmlToMarkdown(postData.description);
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
    var tempFormDummyData = formDummyData;
    tempFormDummyData = tempFormDummyData.map(keys => {
      if (clickedCreatedIssues?.trigger == "form") {
        if (keys.issue_no == formData.issue_no) {
          return { ...formData, scanner_detection: [{ value: formData?.scanner_detection }], impact_type: [{ value: formData?.impact_type }], owasp_weakness: formData?.owasp_weakness.map(keys => (keys)), description: htmlToMarkdown(formData?.description) };
        } else {
          return { ...keys, scanner_detection: [{ value: keys?.scanner_detection }], impact_type: [{ value: keys?.impact_type }], owasp_weakness: keys?.owasp_weakness.map(keys => (keys)), description: htmlToMarkdown(keys?.description) };
        }
      } else if (clickedCreatedIssues?.trigger == "table") {
        if (keys.id == formData.id) {
          return { ...formData, scanner_detection: [{ value: formData?.scanner_detection }], impact_type: [{ value: formData?.impact_type }], owasp_weakness: formData?.owasp_weakness.map(keys => (keys)), description: htmlToMarkdown(formData?.description) };
        } else {
          return { ...keys, scanner_detection: [{ value: keys?.scanner_detection }], impact_type: [{ value: keys?.impact_type }], owasp_weakness: keys?.owasp_weakness.map(keys => (keys)), description: htmlToMarkdown(keys?.description) };
        }
      }
    });

    var postData = { bulk_create: { ...formData1, issues: tempFormDummyData } };

    fetch(`${APIAddress}/api/v1/bulk_create`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl9pZCI6MiwiZXhwIjoxNzYwOTgwNDgxfQ.x6HpeiH-3U5girByflMR0pskpAOPFT-NNPcNQR6R3tg",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      }
    })
      .then(async (response) => {
        const result = await response.json();
        if (response.status === 200) {
          setSnackBarInfo({
            open: true,
            severity: "success",
            message: "Success",
          });
          setOpen(false);
        } else {
          setSnackBarInfo({
            open: true,
            severity: "error",
            message: "Something went wrong",
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setSnackBarInfo({
          open: true,
          severity: "error",
          message: error.message || "Network error",
        });
        setOpen(false);
        setIsLoading(false);
      });
  };

  const handleUpdateFormData = () => {
    setIsLoading(true);
    const { owasp_weakness, ...postData } = { ...formData, owasp: formData.owasp_weakness.map(keys => keys.value).join(",") };
    postData.description = htmlToMarkdown(postData.description);
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
              handlePOSTCreateIssues();
            } else {
              setClickedCreatedIssues({ trigger: 'form' });
            }
          }}>
            {["form", "table"].includes(clickedCreatedIssues?.trigger) ? "Create" : "Create Issues"}
          </Button>
            {!(["form", "table"].includes(clickedCreatedIssues?.trigger)) && <>
              <Button style={{ background: '#344feb', color: 'white', margin: "0px 4px 0px 4px" }} onClick={handleUpdateFormData}>
                Update
              </Button>
              <Button style={{ background: 'red', color: 'white', margin: "0px 4px 0px 4px" }} onClick={() => handleDeleteRow(formData.id)}>
                Delete
              </Button>
            </>}
          </>}
        </Toolbar>
      </AppBar>
      <DialogContent
        style={{ background: 'rgb(57, 57, 57)' }}
      >
        {clickedCreatedIssues?.trigger == "form" && <>
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
            value={formData1?.issues}
            onChange={(e) => handleFormData1Change('issues', e.target.value)}
          />
          <Button style={{ background: 'green', color: 'white', margin: "0px 4px 0px 4px" }} onClick={handleAddIssues}>
            Add
          </Button>
        </>
        }

        {clickedCreatedIssues?.trigger == "table" && <>
          <Typography>Template</Typography>
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
            options={formDummyData?.map(keys => keys?.summary)}
            renderInput={(params) => <TextField {...params} />}
            value={formData?.summary}
            onChange={(e, value) => handleTemplateChange('summary', formData?.id, value)}
          />
        </>
        }

        {["form", "table"].includes(clickedCreatedIssues?.trigger) && <><Typography>PSS Ticket</Typography>
          <TextField sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ccc"
              }
            }
          }}
            fullWidth
            variant="outlined"
            value={formData1?.pss_ticket}
            onChange={(e) => handleFormData1Change('pss_ticket', e.target.value)}
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
            value={formData1?.test_execution_id}
            onChange={(e) => handleFormData1Change('test_execution_id', e.target.value)}
          /></>}

        {(formData1?.isVisible && clickedCreatedIssues?.trigger == "form") && <><Typography>Issue No</Typography>
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
            options={Array.from({ length: formData1?.issues }, (_, i) => i + 1)}
            renderInput={(params) => <TextField {...params} />}
            value={formData?.issue_no}
            onChange={(e, value) => handleIssueNoChange('issue_no', value)}
          />
          <Divider style={{ background: "#ccc", margin: "30px 0px" }} /></>}

        {clickedCreatedIssues?.trigger == "table" && <Divider style={{ background: "#ccc", margin: "30px 0px" }} />}

        {(formData1?.isVisible || !["form", "table"].includes(clickedCreatedIssues?.trigger)) && <><Typography>Summary</Typography>
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
          <ReactQuill theme="snow" value={formData?.description} onChange={(e) => handleChange('description', e)} />

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
            startIcon={<CloudUploadIcon />}
            style={{ display: "flex", width: "20%", margin: "10px 0px" }}
          >
            Upload files
            <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
          </Button>

            <ul style={{ padding: 0, listStyle: "none" }}>
              {formData?.files?.map((file, index) => (
                <li key={index}>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#333333",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      margin: "6px 0",
                    }}
                  >
                    <span>{file.file_name}</span>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteFile(index)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </li>
              ))}
            </ul></>}
        </>}

      </DialogContent>
    </Dialog>
  )
}

export default DialogBox