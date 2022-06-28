import { BaseSyntheticEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { apiService } from "../utilities/apiService";

export function DataInput() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [description, setDescription] = useState("");
    const [fileElement, setFileElement] = useState<BaseSyntheticEvent>();
    const [isUploading, setIsUploading] = useState(false);

    async function uploadNewImage() {
        let reader = new FileReader();
        reader.onloadend = async function () {
            if (reader.result != null && reader.result != undefined) {
                setIsUploading(true);
                const response = await apiService.uploadImage(
                    reader.result.toString().split(",").pop()
                );
                apiService.uploadItem({
                    name: title,
                    prize: price,
                    category: category,
                    imagelink: await response.data.url,
                    description: description,
                });
                setTitle("");
                setPrice(0);
                setCategory("");
                setImageFile("");
                setDescription("");
                setIsUploading(false);
            }
        };
        if (fileElement !== undefined) {
            reader.readAsDataURL(fileElement.target.files[0]);
        }
    }

    function handleFileChange(element: any) {
        setImageFile(element.target.value);
        setFileElement(element);
    }

    return (
        <Form>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Titel des Items</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Titel eingeben"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Preis</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(parseFloat(e.target.value))
                            }
                        />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>Kategorie</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>First catgory</option>
                            <option>Second catgory</option>
                            <option>Third catgory</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Bild-Datei auswählen</Form.Label>
                <Form.Control
                    type="file"
                    value={imageFile}
                    onChange={(e) => handleFileChange(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Beschreibung des Items</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Button
                className="mb-3"
                variant="primary"
                disabled={isUploading}
                onClick={async () => await uploadNewImage()}
            >
                Item hinzufügen
            </Button>
        </Form>
    );
}
