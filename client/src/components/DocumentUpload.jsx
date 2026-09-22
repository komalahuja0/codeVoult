
import { useRef, useState } from "react";

import {
    CheckCircle2,
    FileText,
    FileUp,
    LoaderCircle,
    UploadCloud,
    X,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/documents";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [".pdf", ".txt", ".md"];

function DocumentUpload() {
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const resetMessages = () => {
        setSuccessMessage("");
        setErrorMessage("");
    };

    const validateFile = (file) => {
        if (!file) {
            return "Please select a file.";
        }

        const fileName = file.name.toLowerCase();

        const isAllowedExtension = ALLOWED_EXTENSIONS.some(
            (extension) => fileName.endsWith(extension)
        );

        if (!isAllowedExtension) {
            return "Only PDF, TXT, and Markdown files are allowed.";
        }

        if (file.size > MAX_FILE_SIZE) {
            return "File size must be less than 5 MB.";
        }

        return "";
    };

    const handleFileSelection = (file) => {
        resetMessages();

        const validationError = validateFile(file);

        if (validationError) {
            setSelectedFile(null);
            setErrorMessage(validationError);
            return;
        }

        setSelectedFile(file);
    };

    const handleInputChange = (event) => {
        const file = event.target.files?.[0];

        handleFileSelection(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();

        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];

        handleFileSelection(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setErrorMessage("Please select a file before uploading.");
            return;
        }

        resetMessages();
        setIsUploading(true);

        const formData = new FormData();

        formData.append("document", selectedFile);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "File upload failed."
                );
            }

            setSuccessMessage(data.message);
            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            setErrorMessage(
                error.message ||
                "Something went wrong while uploading the file."
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        resetMessages();

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <section className="w-full max-w-3xl">
            <div className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
                    Knowledge base
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-stone-100 sm:text-4xl">
                    Add a document
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">
                    Upload your developer documentation, notes, or
                    reference material to build your CodeVault knowledge
                    base.
                </p>
            </div>

            <div className="rounded-2xl border border-stone-800 bg-stone-950/60 p-4 shadow-2xl shadow-black/10 sm:p-6">
                <div
                    onDragOver={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`rounded-xl border border-dashed p-6 text-center transition-colors sm:p-10 ${
                        isDragging
                            ? "border-stone-400 bg-stone-800/60"
                            : "border-stone-700 bg-stone-900/40 hover:border-stone-500"
                    }`}
                >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-stone-700 bg-stone-800 text-stone-300">
                        <UploadCloud size={22} strokeWidth={1.6} />
                    </div>

                    <h2 className="mt-5 text-base font-medium text-stone-100">
                        Drop your document here
                    </h2>

                    <p className="mt-2 text-sm text-stone-500">
                        or choose a file from your computer
                    </p>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-stone-600 bg-stone-100 px-4 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 focus:ring-offset-stone-950"
                    >
                        <FileUp size={16} />
                        Choose file
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.txt,.md,application/pdf,text/plain,text/markdown"
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    <p className="mt-5 text-xs text-stone-600">
                        PDF, TXT, or Markdown · Maximum 5 MB
                    </p>
                </div>

                {selectedFile && (
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-stone-800 bg-stone-900/70 p-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-800 text-stone-300">
                                <FileText size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-stone-200">
                                    {selectedFile.name}
                                </p>

                                <p className="mt-1 text-xs text-stone-500">
                                    {formatFileSize(selectedFile.size)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleRemoveFile}
                            disabled={isUploading}
                            aria-label="Remove selected file"
                            className="shrink-0 rounded-md p-2 text-stone-500 transition hover:bg-stone-800 hover:text-stone-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <X size={17} />
                        </button>
                    </div>
                )}

                {successMessage && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-900/70 bg-emerald-950/30 p-4 text-sm text-emerald-300">
                        <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <p>{successMessage}</p>
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-4 rounded-xl border border-red-900/70 bg-red-950/30 p-4 text-sm leading-6 text-red-300">
                        {errorMessage}
                    </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-stone-600">
                        Your document will be sent to the local API.
                    </p>

                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={!selectedFile || isUploading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isUploading ? (
                            <>
                                <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <UploadCloud size={16} />
                                Upload document
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DocumentUpload;