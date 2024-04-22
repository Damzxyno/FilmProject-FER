import {
  APPLICATION_JSON,
  APPLICATION_XML,
  PLAIN_TEXT,
} from "../default-request-types";
import { useEffect, useState } from "react";
import { getContentType, setContentType } from "../util";

function RequestFormat() {
  const [selectedFormat, setSelectedFormat] = useState();
  useEffect(() => {
    const storedFormat = getContentType();
    setSelectedFormat(storedFormat);
  }, []);

  useEffect(() => {
    if (selectedFormat) {
      setContentType(selectedFormat);
    }
  }, [selectedFormat]);

  return (
    <div className="request-format">
      <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
      >
        <option value={APPLICATION_XML}>XML</option>
        <option value={APPLICATION_JSON}>JSON</option>
        <option value={PLAIN_TEXT}>Plaintext</option>
      </select>
    </div>
  );
}

export default RequestFormat;
