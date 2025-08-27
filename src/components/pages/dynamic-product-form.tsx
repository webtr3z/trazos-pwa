/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileDropZone } from "@/components/ui/file-drop-zone";
import { Plus, X, Loader2, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomField {
  id: string;
  label: string;
  name: string;
  type: "text" | "number" | "select";
  required: boolean;
  options?: string[];
  placeholder?: string;
  value?: string;
}

export interface NFTFormData {
  name: string;
  description: string;
  image: File | null;
  properties: Array<{
    trait_type: string;
    value: string;
  }>;
}

interface DynamicProductFormProps {
  onSubmit: (data: NFTFormData) => void;
  onCancel: () => void;
  isMinting?: boolean;
}

export function DynamicProductForm({
  onSubmit,
  onCancel,
  isMinting = false,
}: DynamicProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddField, setShowAddField] = useState(false);

  // Add custom field
  const addCustomField = (field: Omit<CustomField, "id">) => {
    const newField: CustomField = {
      ...field,
      id: Date.now().toString(),
    };
    setCustomFields([...customFields, newField]);
    setShowAddField(false);
  };

  // Remove custom field
  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };

  // Handle form data changes
  const handleFormDataChange = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle image selection
  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del producto es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción del producto es requerida";
    }

    if (!selectedImage) {
      newErrors.image = "La imagen del producto es requerida";
    }

    // Validate custom fields
    customFields.forEach((field) => {
      if (field.required && !field.name.trim()) {
        newErrors[`field_${field.id}`] =
          `El campo "${field.label}" es requerido`;
      }
      if (field.required && !field.value?.trim()) {
        newErrors[`field_${field.id}`] =
          `El valor del campo "${field.label}" es requerido`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build properties array from custom fields
      const properties = customFields.map((field) => {
        let fieldValue = field.value || "";

        // For select fields, use the selected option value
        if (
          field.type === "select" &&
          field.options &&
          field.options.length > 0
        ) {
          fieldValue = field.options[0] || "";
        }

        return {
          trait_type: field.label,
          value: fieldValue,
        };
      });

      // Create NFT object
      const nftObject: NFTFormData = {
        name: formData.name,
        description: formData.description,
        image: selectedImage,
        properties,
      };

      // Call onSubmit
      onSubmit(nftObject);

      // Reset form
      setFormData({ name: "", description: "" });
      setCustomFields([]);
      setSelectedImage(null);
      setErrors({});

      toast.success("¡Producto creado exitosamente!");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error al crear el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Product Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Producto</CardTitle>
            <p className="text-sm text-muted-foreground">
              🚀 Crea tu producto NFT con campos personalizados
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleFormDataChange("name", e.target.value)}
                placeholder="Ej: Nike Air Max 2024"
                className={`${errors.name ? "border-red-500" : ""} focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleFormDataChange("description", e.target.value)
                }
                placeholder="Describe tu producto..."
                rows={3}
                className={`${errors.description ? "border-red-500" : ""} focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Imagen del Producto *</Label>
              <FileDropZone
                accept="image/*"
                onFileSelect={handleImageSelect}
                onFileRemove={handleImageRemove}
                selectedFile={selectedImage}
                type="image"
                className={errors.image ? "border-red-500" : ""}
              />
              {selectedImage && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>✅ {selectedImage.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Custom Fields */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Campos Personalizados</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddField(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Campo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Agrega campos personalizados que se convertirán en atributos del
              NFT
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {customFields.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hay campos personalizados. Haz clic en "Agregar Campo" para
                comenzar.
              </p>
            ) : (
              <div className="space-y-3">
                {customFields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{field.label}</span>
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          ({field.type})
                        </span>
                      </div>
                      <Input
                        value={field.value || ""}
                        onChange={(e) => {
                          const updatedFields = customFields.map((f) =>
                            f.id === field.id
                              ? { ...f, value: e.target.value }
                              : f,
                          );
                          setCustomFields(updatedFields);
                        }}
                        placeholder={
                          field.placeholder || `Valor para ${field.label}`
                        }
                        className={`${errors[`field_${field.id}`] ? "border-red-500" : ""} focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1`}
                      />
                      {errors[`field_${field.id}`] && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors[`field_${field.id}`]}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomField(field.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || isMinting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando Producto...
              </>
            ) : isMinting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparando Wallet...
              </>
            ) : (
              "Nuevo Producto"
            )}
          </Button>
        </div>
      </form>

      {/* Add Field Modal */}
      {showAddField && (
        <AddFieldModal
          onAdd={addCustomField}
          onCancel={() => setShowAddField(false)}
        />
      )}
    </div>
  );
}

// Add Field Modal Component
interface AddFieldModalProps {
  onAdd: (field: Omit<CustomField, "id">) => void;
  onCancel: () => void;
}

function AddFieldModal({ onAdd, onCancel }: AddFieldModalProps) {
  const [fieldData, setFieldData] = useState<Omit<CustomField, "id">>({
    label: "",
    name: "",
    type: "text",
    required: false,
    options: [],
    placeholder: "",
  });

  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fieldData.label.trim() || !fieldData.name.trim()) {
      return;
    }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 bg-background border-none">
        <CardHeader>
          <CardTitle>Agregar Campo Personalizado</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
                  className="focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
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
                  className="focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Campo</Label>
              <Select
                value={fieldData.type}
                onValueChange={(value) =>
                  handleTypeChange(value as CustomField["type"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el tipo de campo" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem
                    value="text"
                    className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                  >
                    Texto
                  </SelectItem>
                  <SelectItem
                    value="number"
                    className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                  >
                    Número
                  </SelectItem>
                  <SelectItem
                    value="select"
                    className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                  >
                    Selección
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showOptions && (
              <div className="space-y-2">
                <Label>Opciones de Selección</Label>
                <div className="space-y-2">
                  {fieldData.options?.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Opción ${index + 1}`}
                        className="focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
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

            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={fieldData.placeholder}
                onChange={(e) =>
                  setFieldData({ ...fieldData, placeholder: e.target.value })
                }
                placeholder="Texto de ejemplo para el campo"
                className="focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="required"
                checked={fieldData.required}
                onChange={(e) =>
                  setFieldData({ ...fieldData, required: e.target.checked })
                }
                className="rounded"
              />
              <Label htmlFor="required">Campo requerido</Label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">Agregar Campo</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
