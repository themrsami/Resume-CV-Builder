'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Briefcase, GraduationCap, Mail, MapPin, Phone, User, X, Printer } from 'lucide-react'
import html2canvas from 'html2canvas'

type ResumeData = {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  summary: string
  highlights: string[]
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    graduationDate: string
  }>
  skills: string[]
}

type Template = 'modern' | 'classic' | 'minimalist'

type FontStyle = {
  family: string
  size: string
  color: string
}

type PersonalInfoSectionProps = {
  resumeData: ResumeData
  handleInputChange: (section: keyof ResumeData, field: string, value: string, index?: number) => void
  errors: Partial<Record<keyof ResumeData['personalInfo'], string>>
  fontStyle: FontStyle
}

const PersonalInfoSection = ({ resumeData, handleInputChange, errors, fontStyle }: PersonalInfoSectionProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input 
        id="name" 
        value={resumeData.personalInfo.name} 
        onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)} 
        className={errors.name ? 'border-red-500' : ''}
        style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
      />
      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        type="email" 
        value={resumeData.personalInfo.email} 
        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} 
        className={errors.email ? 'border-red-500' : ''}
        style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>
    <div>
      <Label htmlFor="phone">Phone</Label>
      <Input 
        id="phone" 
        value={resumeData.personalInfo.phone} 
        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} 
        className={errors.phone ? 'border-red-500' : ''}
        style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
      />
      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
    </div>
    <div>
      <Label htmlFor="location">Location</Label>
      <Input 
        id="location" 
        value={resumeData.personalInfo.location} 
        onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)} 
        className={errors.location ? 'border-red-500' : ''}
        style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
      />
      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
    </div>
  </div>
)

type SummarySectionProps = {
  resumeData: ResumeData
  handleInputChange: (section: keyof ResumeData, field: string, value: string, index?: number) => void
  addItem: (section: 'experience' | 'education' | 'highlights') => void
  removeItem: (section: 'experience' | 'education' | 'highlights', index: number) => void
  fontStyle: FontStyle
}

const SummarySection = ({ resumeData, handleInputChange, addItem, removeItem, fontStyle }: SummarySectionProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="summary">Professional Summary</Label>
      <Textarea 
        id="summary" 
        value={resumeData.summary} 
        onChange={(e) => handleInputChange('summary', 'summary', e.target.value)} 
        className="h-40"
        style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
      />
    </div>
    <div>
      <Label>Highlights</Label>
      {resumeData.highlights.map((highlight, index) => (
        <div key={index} className="flex items-center space-x-2 mt-2">
          <Input 
            value={highlight} 
            onChange={(e) => handleInputChange('highlights', 'highlight', e.target.value, index)} 
            placeholder="Add a key highlight"
            style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
          />
          <Button variant="outline" size="icon" onClick={() => removeItem('highlights', index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={() => addItem('highlights')} className="mt-2">Add Highlight</Button>
    </div>
  </div>
)

type ExperienceSectionProps = {
  resumeData: ResumeData
  handleInputChange: (section: keyof ResumeData, field: string, value: string, index?: number) => void
  addItem: (section: 'experience' | 'education' | 'highlights') => void
  removeItem: (section: 'experience' | 'education', index: number) => void
  fontStyle: FontStyle
}

const ExperienceSection = ({ resumeData, handleInputChange, addItem, removeItem, fontStyle }: ExperienceSectionProps) => (
  <div className="space-y-6">
    {resumeData.experience.map((exp, index) => (
      <Card key={index}>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <Input 
              placeholder="Company" 
              value={exp.company} 
              onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)} 
              style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
            />
            <Input 
              placeholder="Position" 
              value={exp.position} 
              onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)} 
              style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Start Date" 
                value={exp.startDate} 
                onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)} 
                style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
              />
              <Input 
                placeholder="End Date" 
                value={exp.endDate} 
                onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)} 
                style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
              />
            </div>
            <Textarea 
              placeholder="Description" 
              value={exp.description} 
              onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)} 
              style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
            />
            <Button variant="destructive" onClick={() => removeItem('experience', index)}>Remove</Button>
          </div>
        </CardContent>
      </Card>
    ))}
    <Button onClick={() => addItem('experience')}>Add Experience</Button>
  </div>
)

type EducationSectionProps = {
  resumeData: ResumeData
  handleInputChange: (section: keyof ResumeData, field: string, value: string, index?: number) => void
  addItem: (section: 'experience' | 'education' | 'highlights') => void
  removeItem: (section: 'education', index: number) => void
  fontStyle: FontStyle
}

const EducationSection = ({ resumeData, handleInputChange, addItem, removeItem, fontStyle }: EducationSectionProps) => (
  <div className="space-y-6">
    {resumeData.education.map((edu, index) => (
      <Card key={index}>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <Input 
              placeholder="Institution" 
              value={edu.institution} 
              onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)} 
              style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
            />
            <Input 
              placeholder="Degree" 
              value={edu.degree} 
              onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)} 
              style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
            />
            <Input 
              placeholder="Graduation Date" 
              value={edu.graduationDate} 
              onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)} 
              style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
            />
            <Button variant="destructive" onClick={() => removeItem('education', index)}>Remove</Button>
          </div>
        </CardContent>
      </Card>
    ))}
    <Button onClick={() => addItem('education')}>Add Education</Button>
  </div>
)

type SkillsSectionProps = {
  resumeData: ResumeData
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
  fontStyle: FontStyle
}

const SkillsSection = ({ resumeData, addSkill, removeSkill, fontStyle }: SkillsSectionProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="skills">Skills</Label>
      <div className="flex items-center space-x-2">
        <Input 
          id="skills" 
          placeholder="Add a skill" 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addSkill(e.currentTarget.value)
              e.currentTarget.value = ''
            }
          }}
          style={{ fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}
        />
        <Button onClick={() => {
          const input = document.getElementById('skills') as HTMLInputElement
          addSkill(input.value)
          input.value = ''
        }}>Add</Button>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {resumeData.skills.map((skill, index) => (
        <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
          {skill}
          <Button variant="ghost" size="sm" className="ml-2 h-4 w-4 p-0" onClick={() => removeSkill(skill)}>
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  </div>
)

type ResumePreviewProps = {
  resumeData: ResumeData
  template: Template
  backgroundColor: string
  fontStyle: FontStyle
}

const ResumePreview = ({ resumeData, template, backgroundColor, fontStyle }: ResumePreviewProps) => {
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return 'bg-white text-gray-800 font-sans'
      case 'classic':
        return 'bg-gray-100 text-gray-900 font-serif'
      case 'minimalist':
        return 'bg-white text-gray-700 font-sans'
      default:
        return 'bg-white text-gray-800 font-sans'
    }
  }

  return (
    <div className={`p-8 ${getTemplateStyles()}`} style={{ backgroundColor, fontFamily: fontStyle.family, fontSize: fontStyle.size, color: fontStyle.color }}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
          <div className="flex justify-center space-x-4 text-sm">
            {resumeData.personalInfo.email && (
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {resumeData.personalInfo.email}
              </span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {resumeData.personalInfo.phone}
              </span>
            )}
            {resumeData.personalInfo.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {resumeData.personalInfo.location}
              </span>
            )}
          </div>
        </header>

        {resumeData.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Professional Summary
            </h2>
            <p>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.highlights.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Key Highlights</h2>
            <ul className="list-disc list-inside">
              {resumeData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Work Experience
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resumeData.experience.map((exp, index) => (
                  <TableRow key={index}>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell>{exp.position}</TableCell>
                    <TableCell>{`${exp.startDate} - ${exp.endDate}`}</TableCell>
                    <TableCell>{exp.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Graduation Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resumeData.education.map((edu, index) => (
                  <TableRow key={index}>
                    <TableCell>{edu.institution}</TableCell>
                    <TableCell>{edu.degree}</TableCell>
                    <TableCell>{edu.graduationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}

        {resumeData.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default function EnhancedResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: '', email: '', phone: '', location: '' },
    summary: '',
    highlights: [],
    experience: [],
    education: [],
    skills: []
  })
  const [template, setTemplate] = useState<Template>('modern')
  const [errors, setErrors] = useState<Partial<Record<keyof ResumeData['personalInfo'], string>>>({})
  const [fontStyle, setFontStyle] = useState<FontStyle>({
    family: 'Arial',
    size: '16px',
    color: '#000000'
  })
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const validateField = useCallback((field: keyof ResumeData['personalInfo'], value: string) => {
    let error = ''
    switch (field) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email address'
        }
        break
      case 'phone':
        if (!/^\+?[\d\s-()]{10,}$/.test(value)) {
          error = 'Invalid phone number'
        }
        break
      default:
        if (!value) {
          error = 'This field is required'
        }
    }
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  const handleInputChange = useCallback((section: keyof ResumeData, field: string, value: string, index?: number) => {
    setResumeData(prev => {
      if (Array.isArray(prev[section]) && typeof index === 'number') {
        const newArray = [...prev[section]]
        if (section === 'highlights') {
          newArray[index] = value
        } else {
          newArray[index] = { ...newArray[index], [field]: value }
        }
        return { ...prev, [section]: newArray }
      } else if (section === 'personalInfo') {
        return { ...prev, [section]: { ...prev[section], [field]: value } }
      } else {
        return { ...prev, [section]: value }
      }
    })

    if (section === 'personalInfo') {
      validateField(field as keyof ResumeData['personalInfo'], value)
    }
  }, [validateField])

  const addItem = useCallback((section: 'experience' | 'education' | 'highlights') => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], section === 'experience' 
        ? { company: '', position: '', startDate: '', endDate: '', description: '' }
        : section === 'education'
        ? { institution: '', degree: '', graduationDate: '' }
        : ''
      ]
    }))
  }, [])

  const removeItem = useCallback((section: 'experience' | 'education' | 'highlights', index: number) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }, [])

  const addSkill = useCallback((skill: string) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }, [resumeData.skills])

  const removeSkill = useCallback((skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }, [])

  const printResume = useCallback(() => {
    const printContent = document.getElementById('resume-preview')?.innerHTML
    if (printContent) {
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContent
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }, [])

  const exportToImage = useCallback((format: 'png' | 'jpg') => {
    const element = document.getElementById('resume-preview')
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement('a')
        link.download = `resume.${format}`
        link.href = canvas.toDataURL(`image/${format}`)
        link.click()
      })
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Enhanced Resume Builder</h1>
      <div className="mb-4 space-y-4">
        <div>
          <Label htmlFor="template">Choose Template</Label>
          <Select onValueChange={(value: Template) => setTemplate(value)}>
            <SelectTrigger id="template">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="font-family">Font Family</Label>
          <Select onValueChange={(value: string) => setFontStyle(prev => ({ ...prev, family: value }))}>
            <SelectTrigger id="font-family">
              <SelectValue placeholder="Select a font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier">Courier</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="font-size">Font Size</Label>
          <Select onValueChange={(value: string) => setFontStyle(prev => ({ ...prev, size: value }))}>
            <SelectTrigger id="font-size">
              <SelectValue placeholder="Select a font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12px">12px</SelectItem>
              <SelectItem value="14px">14px</SelectItem>
              <SelectItem value="16px">16px</SelectItem>
              <SelectItem value="18px">18px</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="font-color">Font Color</Label>
          <Input
            id="font-color"
            type="color"
            value={fontStyle.color}
            onChange={(e) => setFontStyle(prev => ({ ...prev, color: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="background-color">Background Color</Label>
          <Input
            id="background-color"
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
      </div>
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <PersonalInfoSection 
                  resumeData={resumeData} 
                  handleInputChange={handleInputChange} 
                  errors={errors} 
                  fontStyle={fontStyle}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <SummarySection 
                  resumeData={resumeData} 
                  handleInputChange={handleInputChange} 
                  addItem={addItem} 
                  removeItem={removeItem} 
                  fontStyle={fontStyle}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <ExperienceSection 
                  resumeData={resumeData} 
                  handleInputChange={handleInputChange} 
                  addItem={addItem} 
                  removeItem={removeItem} 
                  fontStyle={fontStyle}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <EducationSection 
                  resumeData={resumeData} 
                  handleInputChange={handleInputChange} 
                  addItem={addItem} 
                  removeItem={removeItem} 
                  fontStyle={fontStyle}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <SkillsSection 
                  resumeData={resumeData} 
                  addSkill={addSkill} 
                  removeSkill={removeSkill} 
                  fontStyle={fontStyle}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div id="resume-preview">
                  <ResumePreview 
                    resumeData={resumeData} 
                    template={template} 
                    backgroundColor={backgroundColor} 
                    fontStyle={fontStyle}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button onClick={printResume}>
              <Printer className="w-4 h-4 mr-2" />
              Print Resume
            </Button>
            <Button onClick={() => exportToImage('png')}>Export as PNG</Button>
            <Button onClick={() => exportToImage('jpg')}>Export as JPG</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}