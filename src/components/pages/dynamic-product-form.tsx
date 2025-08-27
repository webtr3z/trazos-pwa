"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FileDropZone } from "@/components/ui/file-drop-zone";
import { Plus, X, Edit } from "lucide-react";

interface CustomField {
  id: string;
  label: string;
  name: string;
  type: "text" | "number" | "textarea" | "select" | "image" | "document";
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: {
    maxSize?: number; // in MB
    allowedTypes?: string[];
  };
}

interface DynamicProductFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function DynamicProductForm({
  onSubmit,
  onCancel,
  initialData,
}: DynamicProductFormProps) {
  const [customFields, setCustomFields] = useState<CustomField[]>(() => {
    if (!initialData?.customFields) return [];
    
    return Object.entries(initialData.customFields).map(([key, value]) => {
      // Determine field type based on the key and value
      let fieldType: CustomField['type'] = 'text';
      if (key === 'image' || key.includes('image')) fieldType = 'image';
      else if (key === 'document' || key.includes('pdf')) fieldType = 'document';
      else if (typeof value === 'number') fieldType = 'number';
      else if (Array.isArray(value)) fieldType = 'select';
      
      return {
        id: Date.now().toString() + Math.random(),
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        name: key,
        type: fieldType,
        required: false,
        placeholder: `Ingresa ${key.toLowerCase()}`,
        options: Array.isArray(value) ? value : undefined,
        validation: fieldType === 'image' ? { maxSize: 5 } : fieldType === 'document' ? { maxSize: 10 } : undefined,
      };
    });
  });
  
  const [showAddField, setShowAddField] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });
  
  // Initialize selectedFiles with existing images/documents from initialData
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [existingFiles, setExistingFiles] = useState<Record<string, string>>(() => {
    if (!initialData?.customFields) return {};
    
    const files: Record<string, string> = {};
    Object.entries(initialData.customFields).forEach(([key, value]) => {
      if (key === 'image' || key === 'document' || key.includes('image') || key.includes('pdf')) {
        files[key] = String(value);
      }
    });
    return files;
  });

  const addCustomField = (field: Omit<CustomField, "id">) => {
    const newField: CustomField = {
      ...field,
      id: Date.now().toString(),
    };
    setCustomFields([...customFields, newField]);
    setShowAddField(false);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
    // Remove associated file if exists
    const fieldName = customFields.find(f => f.id === id)?.name;
    if (fieldName && selectedFiles[fieldName]) {
      setSelectedFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[fieldName];
        return newFiles;
      });
    }
  };

  const handleFileSelect = (fieldName: string, file: File) => {
    setSelectedFiles(prev => ({ ...prev, [fieldName]: file }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handleFileRemove = (fieldName: string) => {
    setSelectedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFile = (file: File, field: CustomField): string | null => {
    if (field.type === 'image') {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return 'Solo se permiten archivos PNG, JPG, JPEG y GIF';
      }
      if (field.validation?.maxSize && file.size > field.validation.maxSize * 1024 * 1024) {
        return `El archivo excede el tamaño máximo de ${field.validation.maxSize}MB`;
      }
    } else if (field.type === 'document') {
      if (file.type !== 'application/pdf') {
        return 'Solo se permiten archivos PDF';
      }
      if (field.validation?.maxSize && file.size > field.validation.maxSize * 1024 * 1024) {
        return `El archivo excede el tamaño máximo de ${field.validation.maxSize}MB`;
      }
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const customFieldsData: Record<string, any> = {};
    
    customFields.forEach(field => {
      if (field.type === 'image' || field.type === 'document') {
        const file = selectedFiles[field.name];
        if (field.required && !file) {
          newErrors[field.name] = `${field.label} es requerido`;
        } else if (file) {
          customFieldsData[field.name] = file;
        }
      } else {
        const input = (e.target as any)[field.name];
        if (!input) return;
        
        const value = input.value;
        if (field.required && !value) {
          newErrors[field.name] = `${field.label} es requerido`;
        } else if (value !== undefined) {
          customFieldsData[field.name] = value;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      customFields: customFieldsData,
    };

    onSubmit(productData);
    setFormData({ name: "", description: "" });
    setCustomFields([]);
    setSelectedFiles({});
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Add Custom Field Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Agregar Campo Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showAddField ? (
            <Button
              variant="outline"
              onClick={() => setShowAddField(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Nuevo Campo
            </Button>
          ) : (
            <AddFieldForm
              onAdd={addCustomField}
              onCancel={() => setShowAddField(false)}
            />
          )}
        </CardContent>
      </Card>

      {/* Custom Fields Display */}
      {customFields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Campos Personalizados ({customFields.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customFields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {field.type}
                      </Badge>
                      {field.required && (
                        <Badge variant="destructive" className="text-xs">
                          Requerido
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm font-medium">{field.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {field.name}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCustomField(field.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Product Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ej: iPhone 15 Pro"
                required
              />
              {!formData.name && errors.name && (
                <p className="text-sm text-destructive">
                  El nombre del producto es requerido
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe tu producto..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Custom Fields Form */}
        {customFields.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Campos Personalizados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  {field.type === "text" && (
                    <Input
                      name={field.name}
                      defaultValue={initialData?.customFields?.[field.name] || ""}
                      placeholder={
                        field.placeholder ||
                        `Ingresa ${field.label.toLowerCase()}`
                      }
                      required={field.required}
                    />
                  )}
                  {field.type === "number" && (
                    <Input
                      name={field.name}
                      type="number"
                      defaultValue={initialData?.customFields?.[field.name] || ""}
                      placeholder={
                        field.placeholder ||
                        `Ingresa ${field.label.toLowerCase()}`
                      }
                      required={field.required}
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      name={field.name}
                      defaultValue={initialData?.customFields?.[field.name] || ""}
                      placeholder={
                        field.placeholder ||
                        `Ingresa ${field.label.toLowerCase()}`
                      }
                      required={field.required}
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      name={field.name}
                      defaultValue={initialData?.customFields?.[field.name] || ""}
                      className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required={field.required}
                    >
                      <option value="">Selecciona una opción</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {/* Error display for all field types */}
                  {errors[field.name] && (
                    <p className="text-sm text-destructive">
                      {errors[field.name]}
                    </p>
                  )}
                  {field.type === "image" && (
                    <div className="space-y-2">
                      <FileDropZone
                        accept=".png,.jpg,.jpeg,.gif"
                        maxSize={field.validation?.maxSize}
                        onFileSelect={(file) => handleFileSelect(field.name, file)}
                        onFileRemove={() => handleFileRemove(field.name)}
                        selectedFile={selectedFiles[field.name] || null}
                        existingFile={existingFiles[field.name] || null}
                        type="image"
                        required={field.required}
                      />
                      {errors[field.name] && (
                        <p className="text-sm text-destructive">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  )}
                  {field.type === "document" && (
                    <div className="space-y-2">
                      <FileDropZone
                        accept=".pdf"
                        maxSize={field.validation?.maxSize}
                        onFileSelect={(file) => handleFileSelect(field.name, file)}
                        onFileRemove={() => handleFileRemove(field.name)}
                        selectedFile={selectedFiles[field.name] || null}
                        existingFile={existingFiles[field.name] || null}
                        type="document"
                          required={field.required}
                      />
                      {errors[field.name] && (
                        <p className="text-sm text-destructive">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Crear Producto</Button>
        </div>
      </form>
    </div>
  );
}

// Add Field Form Component
interface AddFieldFormProps {
  onAdd: (field: Omit<CustomField, "id">) => void;
  onCancel: () => void;
}

function AddFieldForm({ onAdd, onCancel }: AddFieldFormProps) {
  const [fieldData, setFieldData] = useState<Omit<CustomField, "id">>({
    label: "",
    name: "",
    type: "text",
    required: false,
    options: [],
    placeholder: "",
    validation: {},
  });

  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(fieldData);
  };

  const handleTypeChange = (type: CustomField["type"]) => {
    setFieldData({ ...fieldData, type });
    setShowOptions(type === "select");
  };

  const addOption = () => {
    setFieldData({
      ...fieldData,
      options: [...(fieldData.options || []), ""],
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(fieldData.options || [])];
    newOptions[index] = value;
    setFieldData({ ...fieldData, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = fieldData.options?.filter((_, i) => i !== index) || [];
    setFieldData({ ...fieldData, options: newOptions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="label">Etiqueta *</Label>
          <Input
            id="label"
            value={fieldData.label}
            onChange={(e) =>
              setFieldData({ ...fieldData, label: e.target.value })
            }
            placeholder="Ej: Marca, Color, Tamaño"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Campo *</Label>
          <Input
            id="name"
            value={fieldData.name}
            onChange={(e) =>
              setFieldData({ ...fieldData, name: e.target.value })
            }
            placeholder="Ej: brand, color, size"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Campo *</Label>
          <select
            id="type"
            value={fieldData.type}
            onChange={(e) =>
              handleTypeChange(e.target.value as CustomField["type"])
            }
            className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="text">Texto</option>
            <option value="number">Número</option>
            <option value="textarea">Área de texto</option>
            <option value="select">Selección</option>
            <option value="image">Imagen</option>
            <option value="document">Documento PDF</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input
            id="placeholder"
            value={fieldData.placeholder}
            onChange={(e) =>
              setFieldData({ ...fieldData, placeholder: e.target.value })
            }
            placeholder="Texto de ayuda"
          />
        </div>
      </div>

      {/* Options for Select Fields */}
      {showOptions && (
        <div className="space-y-3">
          <Label>Opciones de Selección</Label>
          <div className="space-y-2">
            {fieldData.options?.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Opción ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeOption(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addOption}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Opción
            </Button>
          </div>
        </div>
      )}

      {/* File Validation Options */}
      {(fieldData.type === 'image' || fieldData.type === 'document') && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maxSize">Tamaño Máximo (MB)</Label>
            <Input
              id="maxSize"
              type="number"
              min="1"
              max="100"
              value={fieldData.validation?.maxSize || ""}
              onChange={(e) => setFieldData({
                ...fieldData,
                validation: { 
                  ...fieldData.validation, 
                  maxSize: Number(e.target.value) || undefined 
                }
              })}
              placeholder={fieldData.type === 'image' ? "5" : "10"}
            />
          </div>
          <div className="space-y-2">
            <Label>Tipos Permitidos</Label>
            <div className="text-sm text-muted-foreground">
              {fieldData.type === 'image' ? 'PNG, JPG, JPEG, GIF' : 'PDF'}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="required"
          checked={fieldData.required}
          onChange={(e) =>
            setFieldData({ ...fieldData, required: e.target.checked })
          }
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="required">Campo requerido</Label>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Agregar Campo</Button>
      </div>
    </form>
  );
}
