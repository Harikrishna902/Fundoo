<?php
namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Labels")
 */
class Labels{
    /**
	 *  @Id @Column(type="integer") @GeneratedValue
	 * 
	 */
    protected $id;
    /**
	 *  @Column(type="string")
	 *  */
    protected $labelname;
  
    /**
     * @ManyToOne(targetEntity="Users", inversedBy="userid")
     */
    protected $luid;
    
    /**
     * @ManyToMany(targetEntity="Notes",mappedBy="labels")
     */
    protected $labeluid;
    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->labeluid = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set labelname.
     *
     * @param string $labelname
     *
     * @return Labels
     */
    public function setLabelname($labelname)
    {
        $this->labelname = $labelname;

        return $this;
    }

    /**
     * Get labelname.
     *
     * @return string
     */
    public function getLabelname()
    {
        return $this->labelname;
    }

    /**
     * Set luid.
     *
     * @param \Entity\Users|null $luid
     *
     * @return Labels
     */
    public function setLuid(\Entity\Users $luid = null)
    {
        $this->luid = $luid;

        return $this;
    }

    /**
     * Get luid.
     *
     * @return \Entity\Users|null
     */
    public function getLuid()
    {
        return $this->luid;
    }

    /**
     * Add labeluid.
     *
     * @param \Entity\Notes $labeluid
     *
     * @return Labels
     */
    public function addLabeluid(\Entity\Notes $labeluid)
    {
        $this->labeluid[] = $labeluid;

        return $this;
    }

    /**
     * Remove labeluid.
     *
     * @param \Entity\Notes $labeluid
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeLabeluid(\Entity\Notes $labeluid)
    {
        return $this->labeluid->removeElement($labeluid);
    }

    /**
     * Get labeluid.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLabeluid()
    {
        return $this->labeluid;
    }
}
